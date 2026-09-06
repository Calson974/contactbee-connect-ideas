-- 1) Fix mutable search_path on functions and keep public stats counter working via SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.count_todays_submissions()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT COUNT(*)::INTEGER
  FROM public.submissions
  WHERE DATE(created_at) = CURRENT_DATE
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 2) Restrict submissions SELECT to admins only
DROP POLICY IF EXISTS "Anyone can view submissions" ON public.submissions;
CREATE POLICY "Admins can view submissions"
ON public.submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3) Restrict daily_vcards SELECT to admins only
DROP POLICY IF EXISTS "Anyone can view daily vcards" ON public.daily_vcards;
CREATE POLICY "Admins can view daily vcards"
ON public.daily_vcards
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 4) Basic anti-flood protection: max 3 submissions per phone number per day
CREATE OR REPLACE FUNCTION public.limit_submission_rate()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF (SELECT COUNT(*) FROM public.submissions
      WHERE phone = NEW.phone
        AND created_at::date = CURRENT_DATE) >= 3 THEN
    RAISE EXCEPTION 'Submission limit reached for this phone number today';
  END IF;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS limit_submission_rate_trigger ON public.submissions;
CREATE TRIGGER limit_submission_rate_trigger
BEFORE INSERT ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.limit_submission_rate();