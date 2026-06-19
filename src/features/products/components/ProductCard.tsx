import { Link } from "react-router-dom";

import type { Product } from "../../../types/product";
import type { CartItem } from "../../../types/cart";

import { memo } from "react";

type ProductCardProps = {
    product: Product;
    cartItem?: CartItem;
    onAddToCart: (product: Product) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
};
function ProductCard({
    product,
    cartItem,
    onAddToCart,
    onIncrease,
    onDecrease,
    onRemove,
  }: ProductCardProps) {
    // console.log("ProductCard rendered:");

  // const renderCount = useRef(0);
  // renderCount.current += 1;
  // console.log("ProductCard rendered:", product.title, "count:", renderCount.current);

  return (
    <div className="product_card app_card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product_card_img"
      />

      <div className="product_card_body">
        <h3 className="product_card_title">{product.title}</h3>

        <p className="product_card_category">{product.category}</p>

        <div className="product_card_price">₹{product.price}</div>

        <p className="product_card_description">stock limit: {product.stock}</p>

        <div className="product_card_actions">
          <Link
            to={`/products/${product.id}`}
            className="app_btn app_btn_light"
          >
            Details
          </Link>

           {cartItem ? (
            <div className="product_qty_control">
              {cartItem.quantity === 1 ? (
                <button className="product_qty_delete" onClick={() => onRemove(product.id)} title="Remove item" >
                  <i className="fa-solid fa-trash"></i>
                </button>
              ) : (
                <button onClick={() => onDecrease(product.id)}>-</button>
              )}
              <span>{cartItem.quantity}</span>
              <button onClick={() => onIncrease(product.id)}>+</button>
            </div>
          ) : (
            <button className="app_btn app_btn_primary" onClick={() => onAddToCart(product)} >
              <i className="fa-solid fa-cart-plus"></i> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);