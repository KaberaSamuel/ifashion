import { useContext } from "react";
import { CartContext } from "./App";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import "../css/cart.css";

function Cart() {
  const { state: storeData } = useLocation();
  const { cartData, setCartData } = useContext(CartContext);
  console.log(cartData);

  if (cartData.length === 0) {
    return (
      <div className="empty-cart">
        <div>
          <p>Your cart is empty</p>
          <Link to={"/shop"} state={storeData}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="top-bar">Your Cart ({cartData.length} items)</div>

      <div className="items">
        {/* displaying items in the cart */}
        {cartData.map(({ id, title, image, price, total, quantity }) => (
          <div key={id} className="item">
            <div>
              <img src={image} />
            </div>

            <div className="description">
              <p className="title">{title}</p>
              <p>price: {price}</p>
              <p>total: {total}</p>
              <div>
                <FontAwesomeIcon className="icon" icon={faCircleMinus} />
                {quantity}
                <FontAwesomeIcon className="icon" icon={faCirclePlus} />
              </div>
            </div>
            <div className="remove">Remove</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
