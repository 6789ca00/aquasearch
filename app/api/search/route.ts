import { NextRequest, NextResponse } from "next/server";

import { resolveSearchItems } from "@/lib/search/resolveSearchItems";
import { expandSearchTerms } from "@/lib/search/expandSearchTerms";
import { searchProducts } from "@/lib/search/searchProducts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // 1. 검색어가 어떤 search_item인지 찾기
    const searchItemIds =
      await resolveSearchItems(query);

    // 2. 대표명 + alias로 검색어 확장
    const searchTerms =
      await expandSearchTerms(
        query,
        searchItemIds
      );

    // 3. 실제 상품 검색
    const products =
      await searchProducts(searchTerms);

    return NextResponse.json(products);

  } catch (error) {
    console.error("검색 오류:", error);

    return NextResponse.json(
      {
        error:
          "상품 검색 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}