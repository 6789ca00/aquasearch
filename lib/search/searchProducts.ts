import { supabase } from "@/lib/supabase";

export async function searchProducts(
  searchTerms: string[]
) {
  const searches = searchTerms.map((term) =>
    supabase.rpc("search_products_normalized", {
      search_query: term,
    })
  );

  const results = await Promise.all(searches);

  const error = results.find(
    (result) => result.error
  )?.error;

  if (error) {
    throw error;
  }

  const products = results.flatMap(
    (result) => result.data ?? []
  );

  return Array.from(
    new Map(
      products.map((product) => [
        product.id,
        {
          id: product.id,
          name: product.name,
          shop_id: product.shop_id,
          price: product.price,
          status: product.status,
          product_url: product.product_url,
          image_url: product.image_url,

          // 기존 프론트 구조 유지
          shops: {
            name: product.shop_name,
          },
        },
      ])
    ).values()
  );
}