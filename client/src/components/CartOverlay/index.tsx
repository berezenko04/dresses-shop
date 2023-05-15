import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

//styles
import styles from "./CartOverlay.module.scss";

//components
import CartItem from "../CartItem";
import Button from "../Button";

//icons
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

//redux
import { authDataSelector } from "@/redux/auth/selectors";
import { TCartItem } from "@/redux/auth/types";

//utils
import { getTotalPrice } from "@/utils/getTotalPrice";


interface CartOverlayProps {
  handleOverlayClick: () => void;
  isOpened: boolean;
  ref?: React.ForwardedRef<HTMLDivElement>;
};


const CartOverlay = forwardRef<HTMLDivElement, CartOverlayProps>(({ handleOverlayClick, isOpened }, ref) => {
  const data = useSelector(authDataSelector);
  const cartItems: TCartItem[] = data?.cart || [];
  const totalPrice = getTotalPrice(cartItems);

  return (
    <div className={`${styles.overlay} ${isOpened ? styles.overlay__opened : styles.overlay__closed}`} ref={ref}>
      <div className={styles.overlay__head}>
        <h3>Cart ({data?.cart.length})</h3>
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
          <Button theme="primary" size="sm">
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
});


export default CartOverlay;
