-- ============================================
-- AquaSearch
-- Schema updates
-- ============================================


-- 상품 판매 상태 기본값
ALTER TABLE public.shop_products
ALTER COLUMN status SET DEFAULT 'on_sale'::text;


-- 같은 쇼핑몰의 동일 상품 URL 중복 방지
ALTER TABLE public.shop_products
ADD CONSTRAINT shop_products_shop_id_product_url_key
UNIQUE (shop_id, product_url);
