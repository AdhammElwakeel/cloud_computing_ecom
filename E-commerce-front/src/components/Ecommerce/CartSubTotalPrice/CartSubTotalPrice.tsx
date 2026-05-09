import { useAppSelector } from "@/store/Categories/act/hooks";
import "./index.css";

const CartSubPrice = () => {
    const { items, ProductFullinfo } = useAppSelector(state => state.Cart);
    const productSumCalc = ProductFullinfo.reduce((total, product) => {
    const quantity = items[product.id] || 0;
    return total + product.price * quantity;
  }, 0);
  return (
    <div className="CartSubPrice">
      <span>Subtotal:</span>
      <span>{productSumCalc}</span>
    </div>
  );
};
export default CartSubPrice;
