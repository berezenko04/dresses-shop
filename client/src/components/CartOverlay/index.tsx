import React, { forwardRef } from "react";
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
import { userDataSelector } from "@/redux/user/selectors";
import { TCartItem } from "@/redux/user/types";

//utils
import { getTotalPrice } from "@/utils/getTotalPrice";


interface CartOverlayProps {
  handleOverlayClick: () => void;
  isOpened: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
};


const CartOverlay = forwardRef<HTMLDivElement, CartOverlayProps>(({ handleOverlayClick, isOpened }, ref) => {
  const data = useSelector(userDataSelector);
  const cartItems: TCartItem[] = data?.cart || [];
  const totalPrice = getTotalPrice(cartItems);

  return (
    <div className={`${styles.overlay} ${isOpened ? styles.overlay__opened : styles.overlay__closed}`} ref={ref}>
      <div className={styles.overlay__head}>
        <h3>Cart ({data ? data?.cart.length : 0})</h3>
        <button onClick={handleOverlayClick}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.overlay__items}>
        {data?.cart.map((cartItem, index) =>
          data.cart.length > 0 && <CartItem cart={cartItem} key={index} />
        )}
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
