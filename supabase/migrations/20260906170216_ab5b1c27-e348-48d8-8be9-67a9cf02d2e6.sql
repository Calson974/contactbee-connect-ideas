CREATE OR REPLACE FUNCTION public.get_daily_submission_counts()
RETURNS TABLE(submission_date date, contact_count integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT created_at::date AS submission_date, COUNT(*)::integer AS contact_count
  FROM public.submissions
  GROUP BY created_at::date
  ORDER BY created_at::date DESC
$$;

GRANT EXECUTE ON FUNCTION public.get_daily_submission_counts() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_todays_submissions() TO anon, authenticated;