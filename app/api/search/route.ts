import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("shop_products")
    .select(`
    id,
    name,
    shop_id,
    price,
    status,
    product_url,
    image_url,
    shops (
        name
    )
    `)
    .ilike("name", `%${query}%`);

  if (error) {
    console.error("검색 오류:", error);

    return NextResponse.json(
      { error: "상품 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}