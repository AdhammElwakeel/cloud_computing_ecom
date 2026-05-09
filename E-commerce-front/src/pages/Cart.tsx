import CartItemList from "@/components/Ecommerce/CartItemList/CartItemList";
import CartSubPrice from "@/components/Ecommerce/CartSubTotalPrice/CartSubTotalPrice";
import { Loading } from "@/components/feedback";
import { actGetProductByItems } from "@/store/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, ProductFullinfo, loading, error } = useAppSelector(state => state.Cart);

  useEffect(() => {
    const itemIds = Object.keys(items);
    if (itemIds.length > 0) {
      dispatch(actGetProductByItems());
    }
  }, [dispatch, items]); 

  const loadingStatus = loading ? "pending" : "succeeded";
  const products = ProductFullinfo
  .filter(product => items[product.id] && items[product.id] > 0)
  .map(product => ({
    ...product,
    quantity: items[product.id],
  }));

  return (
    <div>
      {products.length > 0 ?(
           <>
           <h2>Cart Items</h2>
           <Loading status={loadingStatus} error={error}>
             <CartItemList products ={products} />
             <CartSubPrice />
           </Loading>
         </>
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </div>
  );
};
export default Cart;