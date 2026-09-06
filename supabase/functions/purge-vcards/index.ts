import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const paths: string[] = [];
  const walk = async (prefix: string) => {
    const { data, error } = await supabase.storage.from("vcards").list(prefix, { limit: 1000 });
    if (error) throw new Error(error.message);
    for (const entry of data ?? []) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id) paths.push(full);
      else await walk(full);
    }
  };
  await walk("");

  if (paths.length) {
    const { error: delErr } = await supabase.storage.from("vcards").remove(paths);
    if (delErr) return new Response(JSON.stringify({ error: delErr.message }), { status: 500 });
  }


  return new Response(JSON.stringify({ removed: paths }), {
    headers: { "Content-Type": "application/json" },
  });
});
