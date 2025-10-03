-- Create submissions table for contact entries
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'premium')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  company TEXT,
  email TEXT,
  job_title TEXT,
  website TEXT,
  custom_field TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert their own submissions
CREATE POLICY "Anyone can insert submissions" 
ON public.submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public to view all submissions (for vCard generation)
CREATE POLICY "Anyone can view submissions" 
ON public.submissions 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();