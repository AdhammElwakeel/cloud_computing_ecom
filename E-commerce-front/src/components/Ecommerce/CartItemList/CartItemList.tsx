import type { TProduct } from "@/types/Product";
import "./CartItemList.css";
import { addToCart, removefromCart, deleteItemCompletely } from "@/store/Cart/CartSlice";
import { useAppDispatch } from "@/store/Categories/act/hooks";

interface CartItemListProps {
  products: (TProduct & { quantity: number })[];
}

const CartItemList = ({ products }: CartItemListProps) => {
  const dispatch = useAppDispatch();
  
  const handleDeleteCompletely = (id: number) => {
    dispatch(deleteItemCompletely({ id }));
  };
  
  const handleIncrease = (id: number, max: number) => {
    dispatch(addToCart({id, max}));
  };
  
  const handleDecrease = (id: number) => {
    dispatch(removefromCart({id}));
  };
  
  return (
    <div className="cart-list">
      {products.map((product) => (
        <div key={product.id} className="cart-item">
          <div className="product-image">
            <img src={product.img} alt={product.title} className="image" />
          </div>
          
          <div className="product-details">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
          </div>
          
          <div className="quantity-section">
            <label className="quantity-label">Qty:</label>
            <span className="quantity">{product.quantity}</span>
          </div>
          
          <div className="total-section">
            <p className="total">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
          
          <div className="actions">
            <button 
              className="increase-btn" 
              type="button" 
              onClick={() => handleIncrease(product.id, product.max || 10)}
              disabled={product.quantity >= (product.max || 10)}
            >
              +
            </button>
            <button 
              className="remove-btn" 
              type="button" 
              onClick={() => handleDeleteCompletely(product.id)}
            >
              Delete
            </button>
            <button 
              className="decrease-btn" 
              type="button" 
              onClick={() => handleDecrease(product.id)}
              disabled={product.quantity <= 1}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;