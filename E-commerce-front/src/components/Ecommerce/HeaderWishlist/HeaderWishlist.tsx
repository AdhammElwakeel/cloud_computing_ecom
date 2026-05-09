import HeartIcon from "@/assets/svg/heart.svg?react";
import "./HeaderWishlist.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/Categories/act/hooks";

const HeaderWishlist = () => {
  const totalWishlistItems = useAppSelector(state => state.Wishlist.itemsId.length);
  const [isPumped, setIsPumped] = useState(false);
  const prevQuantityRef = useRef(0);
  const navigate = useNavigate();

  const wishlistQuantityClass = isPumped
    ? "wishlistQuantity pump"
    : "wishlistQuantity";

  useEffect(() => {
    if (totalWishlistItems > prevQuantityRef.current) {
      setIsPumped(true);
      const debounce = setTimeout(() => {
        setIsPumped(false);
      }, 300);

      prevQuantityRef.current = totalWishlistItems;
      return () => clearTimeout(debounce);
    }

    prevQuantityRef.current = totalWishlistItems;
  }, [totalWishlistItems]);

  return (
    <div className="wishlistContainer" onClick={() => navigate("/wishlist")}>
      <HeartIcon />
      <div className={wishlistQuantityClass}>{totalWishlistItems}</div>
    </div>
  );
};

export default HeaderWishlist;