import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Submission {
  id: string;
  plan_type: string;
  name: string;
  phone: string;
  country: string;
  company?: string;
  email?: string;
  job_title?: string;
  website?: string;
  custom_field?: string;
  custom_field_label?: string;
  address?: string;
  notes?: string;
  created_at: string;
}

function generateVCard(submission: Submission): string {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
  
  const displayName = submission.plan_type === 'free' 
    ? `${submission.name} BW` 
    : submission.name;
  
  lines.push(`FN:${displayName}`);
  lines.push(`N:${displayName};;;;`);
  lines.push(`TEL;TYPE=CELL:${submission.phone}`);
  
  // Country
  if (submission.country) lines.push(`X-COUNTRY:${submission.country}`);
  
  if (submission.email) lines.push(`EMAIL:${submission.email}`);
  if (submission.company) lines.push(`ORG:${submission.company}`);
  if (submission.job_title) lines.push(`TITLE:${submission.job_title}`);
  if (submission.website) lines.push(`URL:${submission.website}`);
  if (submission.address) lines.push(`ADR:;;${submission.address.replace(/\n/g, ' ')};;;;`);
  if (submission.notes) lines.push(`NOTE:${submission.notes.replace(/\n/g, ' ')}`);
  
  // Add custom field with label if both are provided
  if (submission.custom_field_label && submission.custom_field) {
    const fieldName = submission.custom_field_label.toUpperCase().replace(/\s+/g, '-');
    lines.push(`X-${fieldName}:${submission.custom_field}`);
  }
  
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    console.log(`Compiling vCards for date: ${date}`);

    // Check if already compiled for this date
    const { data: existing } = await supabaseClient
      .from('daily_vcards')
      .select('*')
      .eq('date', date)
      .single();

    if (existing) {
      console.log('VCard already exists for this date');
      return new Response(
        JSON.stringify({ 
          message: 'VCard already compiled for this date',
          data: existing 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get all submissions for the date
    const { data: submissions, error } = await supabaseClient
      .from('submissions')
      .select('*')
      .gte('created_at', `${date}T00:00:00`)
      .lt('created_at', `${date}T23:59:59`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!submissions || submissions.length === 0) {
      console.log('No submissions found for this date');
      return new Response(
        JSON.stringify({ message: 'No submissions found for this date' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Found ${submissions.length} submissions`);

    // Generate vCard content
    const vcards = (submissions as Submission[]).map((submission) => generateVCard(submission));
    const vcardContent = vcards.join('\r\n\r\n');

    // Upload to storage
    const fileName = `daily_contacts_${date}.vcf`;
    const filePath = `${date}/${fileName}`;
    
    const { error: uploadError } = await supabaseClient
      .storage
      .from('vcards')
      .upload(filePath, new Blob([vcardContent], { type: 'text/vcard' }), {
        contentType: 'text/vcard',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    // Record in daily_vcards table
    const { data: record, error: recordError } = await supabaseClient
      .from('daily_vcards')
      .insert({
        date,
        file_path: filePath,
        contact_count: submissions.length
      })
      .select()
      .single();

    if (recordError) {
      console.error('Record creation error:', recordError);
      throw recordError;
    }

    console.log('Successfully compiled and stored vCard');

    return new Response(
      JSON.stringify({ 
        message: 'Successfully compiled vCard',
        data: record
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error compiling vCards:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
