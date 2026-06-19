import type { CartItem } from "../../../types/cart";
import type { Product } from "../../../types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
    products: Product[];
    cartItems: CartItem[];
    onAddToCart: (product: Product) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
};
function ProductGrid({
    products,
    cartItems,
    onAddToCart,
    onIncrease,
    onDecrease,
    onRemove,
  }: ProductGridProps) {
    
  if (products.length === 0) {
    return (
      <div className="app_card p-4 text-center">
        <h2>No products found</h2>
      </div>
    );
  }

  return (
    <div className="product_grid">
      {products.map((product) => {
        const cartItem = cartItems.find(
          (item) => item.id === product.id
        );

        return (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={cartItem}
            onAddToCart={onAddToCart}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;