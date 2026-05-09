import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import type { TProduct } from "@/types/Product";
import './index.css'
import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import { addToCart } from "@/store/Cart/CartSlice"; 
import HeartIcon from "@/assets/svg/heart.svg?react";
import actLikeToggle from "@/store/Wishlist/act/actLikeToggle";

const Product = ({ id, title, price, img, max }: TProduct) => { 
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(state => state.Cart?.items || {}); 
  const wishlistItems = useAppSelector(state => state.Wishlist?.itemsId || []);
  const wishlistLoading = useAppSelector(state => state.Wishlist?.loading || false);
  const isFavorite = wishlistItems.includes(id);

  const currentQuantityInCart = cartItems[id] || 0;

  const reachedLimit = currentQuantityInCart >= max;
  const remainingQuantity = max - currentQuantityInCart;

  const handleAddToCart = async () => {
    if (reachedLimit) return;
    
    setIsLoading(true);
    try {
      dispatch(addToCart({ id, max }));
      await new Promise(resolve => setTimeout(resolve, 800));
    } finally {
      setIsLoading(false);
    }
  }

  const toggleHandler = () => {
    if (wishlistItems !== undefined && !wishlistLoading) {
      dispatch(actLikeToggle(id));
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={img} alt={title} />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
          onClick={toggleHandler}
          disabled={wishlistLoading}
          aria-label="Add to wishlist"
        >
          {wishlistLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <HeartIcon />
          )}
        </button>
      </div>
      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">{price} EGP</p>
        <p>Remaining: {remainingQuantity}</p>
        <Button 
          variant={reachedLimit ? "secondary" : "info"}
          className="add-btn" 
          onClick={handleAddToCart}
          disabled={isLoading || reachedLimit}
        >
          {reachedLimit ? (
            "Out of Stock"
          ) : isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Adding...
            </>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Product;