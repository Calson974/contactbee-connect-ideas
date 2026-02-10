-- Add custom field label to support custom field name + value pairs
ALTER TABLE public.submissions 
ADD COLUMN custom_field_label text;

-- Update existing records to have a default label if they have a custom field value
UPDATE public.submissions 
SET custom_field_label = 'Custom' 
WHERE custom_field IS NOT NULL AND custom_field != '';