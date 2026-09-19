type Product = {
  id: number;
  name: string;
  price: number | null;
  status: "on_sale" | "sold_out";
  product_url: string;
  image_url: string;
  shops: {
    name: string;
  };
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <a
      href={product.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card"
    >
      <img
        src={product.image_url}
        alt={product.name}
      />

      <div className="product-info">
        <div className="product-top">
          <span className="shop">
            {product.shops.name}
          </span>

          <span
            className={
              product.status === "on_sale"
                ? "status on-sale"
                : "status sold-out"
            }
          >
            {product.status === "on_sale"
              ? " 판매중"
              : " 품절"}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className="price">
          {product.price !== null
            ? `${product.price.toLocaleString()}원`
            : "가격 정보 없음"}
        </p>
      </div>
    </a>
  );
}