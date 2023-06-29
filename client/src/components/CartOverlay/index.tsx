import React, { forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";

//styles
import styles from "./CartOverlay.module.scss";

//components
import CartItem from "../CartItem";
import Button from "../Button";
import CartEmptyState from "../CartEmptyState";
import TotalPrice from "../TotalPrice";

//icons
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

//redux
import { cartSelector } from "@/redux/cart/selectors";
import { fetchCart } from "@/redux/cart/asyncActions";



interface ICartOverlayProps {
  handleOverlayClick: () => void;
  isOpened: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
};


const CartOverlay = forwardRef<HTMLDivElement, ICartOverlayProps>(({ handleOverlayClick, isOpened }, ref) => {
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const cartEmpty = cartItems.length <= 0;

  return (
    <div className={`${styles.overlay} ${isOpened ? styles.overlay__opened : styles.overlay__closed}`} ref={ref}>
      <div className={styles.overlay__head}>
        <h3>Cart {!cartEmpty && `(${cartItems.length})`}</h3>
        <button onClick={handleOverlayClick}>
          <CloseIcon />
        </button>
      </div>
      {!cartEmpty ?
        <div className={styles.overlay__items}>
          {cartItems && cartItems.map((cartItem, index) => (
            <CartItem cart={cartItem} key={index} />
          ))}
        </div>
        :
        <div className={styles.overlay__empty}>
          <CartEmptyState handleOverlay={handleOverlayClick} />
        </div>
      }
      {!cartEmpty && (
        <div className={styles.overlay__checkout}>
          <TotalPrice discount={0} />
          <Link to="/Sandrela/checkout">
            <Button theme="primary" size="sm" onClick={handleOverlayClick}>
              Checkout
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
});


export default CartOverlay;
