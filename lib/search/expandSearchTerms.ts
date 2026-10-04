import { supabase } from "@/lib/supabase";

export async function expandSearchTerms(
  query: string,
  searchItemIds: number[]
) {
  if (searchItemIds.length === 0) {
    return [query];
  }

  const [itemsResult, aliasesResult] =
    await Promise.all([
      supabase
        .from("search_items")
        .select("name")
        .in("id", searchItemIds),

      supabase
        .from("search_aliases")
        .select("alias")
        .in("search_item_id", searchItemIds),
    ]);

  if (itemsResult.error) {
    throw itemsResult.error;
  }

  if (aliasesResult.error) {
    throw aliasesResult.error;
  }

  const itemNames = (itemsResult.data ?? []).map(
    (item) => item.name
  );

  const aliases = (aliasesResult.data ?? []).map(
    (row) => row.alias
  );

  return [
    ...new Set([
      query,
      ...itemNames,
      ...aliases,
    ]),
  ];
}