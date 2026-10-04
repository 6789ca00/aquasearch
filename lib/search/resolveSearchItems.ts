import { supabase } from "@/lib/supabase";

export async function resolveSearchItems(query: string) {
  const [aliasResult, itemResult] = await Promise.all([
    supabase
      .from("search_aliases")
      .select("search_item_id")
      .ilike("alias", `%${query}%`),

    supabase
      .from("search_items")
      .select("id")
      .ilike("name", `%${query}%`),
  ]);

  if (aliasResult.error) {
    throw aliasResult.error;
  }

  if (itemResult.error) {
    throw itemResult.error;
  }

  const ids = [
    ...(aliasResult.data ?? []).map(
      (row) => row.search_item_id
    ),

    ...(itemResult.data ?? []).map(
      (row) => row.id
    ),
  ];

  return [...new Set(ids)];
}