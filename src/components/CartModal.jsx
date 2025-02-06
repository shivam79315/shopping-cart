import React from "react";
import styles from '../styles/CartModal.module.css'
import { useValue } from "../itemContext";

const CartModal = ({toggle}) => {
    const {cart, total, clear} = useValue();

    return (
        <div className={styles.cartModal}>
            <button className={styles.closeBtn} onClick={toggle}>Close</button>
            <button onClick={clear} className={styles.clearBtn}>Clear</button>

            <div className={styles.itemContainer}>
                {
                    cart.map((item) => {
                        return (
                            <div className={styles.cartCard} key={item.id}>
                                <h1>{item.name}</h1>
                                <h3>X {item.qty} </h3>
                                <h3>X {item.qty * item.price}</h3>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.total}>
                <div className={styles.totalText}>Total</div>
                <div className={styles.priceText}>Price</div>
            </div>
        </div>
    )
}

export default CartModal;