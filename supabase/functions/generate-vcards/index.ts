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
  
  // Format name - add suffix for free plan
  const displayName = submission.plan_type === 'free' 
    ? `${submission.name} BW` 
    : submission.name;
  
  lines.push(`FN:${displayName}`);
  lines.push(`N:${displayName};;;;`);
  
  // Phone number
  lines.push(`TEL;TYPE=CELL:${submission.phone}`);
  
  // Country
  if (submission.country) {
    lines.push(`X-COUNTRY:${submission.country}`);
  }
  
  // Optional fields
  if (submission.email) {
    lines.push(`EMAIL:${submission.email}`);
  }
  
  if (submission.company) {
    lines.push(`ORG:${submission.company}`);
  }
  
  if (submission.job_title) {
    lines.push(`TITLE:${submission.job_title}`);
  }
  
  if (submission.website) {
    lines.push(`URL:${submission.website}`);
  }
  
  if (submission.address) {
    lines.push(`ADR:;;${submission.address.replace(/\n/g, ' ')};;;;`);
  }
  
  if (submission.notes) {
    lines.push(`NOTE:${submission.notes.replace(/\n/g, ' ')}`);
  }
  
  // Add custom field with label if both are provided
  if (submission.custom_field_label && submission.custom_field) {
    const fieldName = submission.custom_field_label.toUpperCase().replace(/\s+/g, '-');
    lines.push(`X-${fieldName}:${submission.custom_field}`);
  }
  
  lines.push('END:VCARD');
  
  return lines.join('\r\n');
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
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

    // Get date parameter or use today
    const url = new URL(req.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    console.log(`Generating vCards for date: ${date}`);

    // Query submissions for the specified date
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
      return new Response(
        JSON.stringify({ message: 'No submissions found for this date' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Found ${submissions.length} submissions`);

    // Generate vCards for all submissions
    const vcards = (submissions as Submission[]).map((submission) => generateVCard(submission));
    const vcardContent = vcards.join('\r\n\r\n');

    // Return as downloadable file
    return new Response(vcardContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/vcard',
        'Content-Disposition': `attachment; filename="contacts_${date}.vcf"`,
      },
    });

  } catch (error) {
    console.error('Error generating vCards:', error);
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
