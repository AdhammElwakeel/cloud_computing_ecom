import Logo from "@/assets/svg/cart.svg?react";
import styles from "./HeaderBasket.module.css";
import { useAppSelector } from "@/store/Categories/act/hooks";
import { getCartTotalQuantitySelector } from "@/store/Cart/Selectors";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity } = styles;

const HeaderBasket = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const [isPumped, setIsPumped] = useState(false);
  const prevQuantityRef = useRef(0);
  const navigate = useNavigate();

  const basketQuantityClass = isPumped
    ? `${basketQuantity} ${styles.pump}`
    : basketQuantity;

  useEffect(() => {
    if (totalQuantity > prevQuantityRef.current) {
      setIsPumped(true);
      const debounce = setTimeout(() => {
        setIsPumped(false);
      }, 300);

      prevQuantityRef.current = totalQuantity;
      return () => clearTimeout(debounce);
    }

    prevQuantityRef.current = totalQuantity;
  }, [totalQuantity]);

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <Logo />
      <div className={basketQuantityClass}>{totalQuantity}</div>
    </div>
  );
};

export default HeaderBasket;
