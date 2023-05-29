import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//styles
import styles from "./CartOverlay.module.scss";

//components
import CartItem from "../CartItem";
import Button from "../Button";

//icons
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

//redux
import { userDataSelector, userIdSelector } from "@/redux/user/selectors";

//utils
import { getTotalPrice } from "@/utils/getTotalPrice";
import { cartSelector, cartTotalPrice } from "@/redux/cart/selectors";
import { fetchCart } from "@/redux/cart/asyncActions";
import { useAppDispatch } from "@/redux/store";


interface CartOverlayProps {
  handleOverlayClick: () => void;
  isOpened: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
};


const CartOverlay = forwardRef<HTMLDivElement, CartOverlayProps>(({ handleOverlayClick, isOpened }, ref) => {
  const cartItems = useSelector(cartSelector);
  const dispatch = useAppDispatch();
  const totalPrice = useSelector(cartTotalPrice);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div className={`${styles.overlay} ${isOpened ? styles.overlay__opened : styles.overlay__closed}`} ref={ref}>
      <div className={styles.overlay__head}>
        <h3>Cart ({cartItems.length > 0 ? cartItems.length : 0})</h3>
        <button onClick={handleOverlayClick}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.overlay__items}>
        {cartItems && cartItems.map((cartItem, index) => (
          <CartItem cart={cartItem} key={index} />
        ))}
      </div>
      {totalPrice !== 0 && (
        <div className={styles.overlay__checkout}>
          <div className={styles.overlay__checkout__total}>
            <h4>Total</h4>
            <p>{totalPrice + " UAH"}</p>
          </div>
          <Link to="/Sandrela/profile/checkout">
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
