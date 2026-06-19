import { memo } from "react";
import type { CartItem as CartItemType } from "../../../types/cart";
type CartItemProps = {
    item: CartItemType;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
};

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    
    <div className="cart_item app_card">
      <img src={item.thumbnail} alt={item.title} className="cart_item_img" />
      <div>
        <h3>{item.title}</h3>
        <p className="cart_item_price">₹{item.price}</p>
        <p className="cart_item_subtotal">Subtotal: ₹{item.price * item.quantity}</p>
      </div>

      <div className="cart_qty">
        {item.quantity === 1 ? (
          <button className="cart_delete_qty_btn" onClick={() => onRemove(item.id)} title="Remove item" >
            <i className="fa-solid fa-trash"></i>
          </button>
        ) : (
          <button onClick={() => onDecrease(item.id)}>-</button>
        )}
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </div>
      <button className="app_btn app_btn_danger" onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}

export default memo(CartItem);