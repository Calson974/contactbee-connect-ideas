-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create daily_vcards table to track compiled files
CREATE TABLE public.daily_vcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  file_path TEXT NOT NULL,
  contact_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.daily_vcards ENABLE ROW LEVEL SECURITY;

-- Anyone can view daily vcards (for public archive)
CREATE POLICY "Anyone can view daily vcards"
ON public.daily_vcards FOR SELECT
USING (true);

-- Only admins can insert/update daily vcards
CREATE POLICY "Admins can manage daily vcards"
ON public.daily_vcards FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for vcard files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vcards', 'vcards', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for vcards bucket
CREATE POLICY "Public can view vcard files"
ON storage.objects FOR SELECT
USING (bucket_id = 'vcards');

CREATE POLICY "Admins can upload vcard files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vcards' AND public.has_role(auth.uid(), 'admin'));

-- Function to count today's submissions
CREATE OR REPLACE FUNCTION public.count_todays_submissions()
RETURNS INTEGER
LANGUAGE SQL
STABLE
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.submissions
  WHERE DATE(created_at) = CURRENT_DATE
$$;