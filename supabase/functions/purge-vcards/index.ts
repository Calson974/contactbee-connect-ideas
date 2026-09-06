import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: files, error } = await supabase.storage.from("vcards").list("", { limit: 1000 });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const paths = (files ?? []).filter((f) => f.name).map((f) => f.name);
  if (paths.length) {
    const { error: delErr } = await supabase.storage.from("vcards").remove(paths);
    if (delErr) return new Response(JSON.stringify({ error: delErr.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ removed: paths }), {
    headers: { "Content-Type": "application/json" },
  });
});
