export type SearchItem = {
  id: number;
  name: string;
  parent_id: number | null;
};

export type Product = {
  id: number;
  name: string;
  shop_id: number;
  price: number | null;
  status: string;
  product_url: string;
  image_url: string | null;

  shops: {
    name: string;
  } | null;
};