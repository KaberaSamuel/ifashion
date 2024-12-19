import { useContext, useState } from "react";
import { CartContext } from "./App";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { MessagePopups } from "./MessagePopups";

import "../css/cart.css";

function Cart() {
  const { state: storeData } = useLocation();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [ordersPopups, setOrdersPopups] = useState([]);

  const numberOfItems = cartItems.reduce(
    (accum, currentItem) => accum + currentItem.units,
    0
  );
  const subTotal = cartItems.reduce((accum, currentItem) => {
    let total = accum + currentItem.total;
    total = total.toFixed(2);
    return Number(total);
  }, 0);

  function addRemoveItem(id, command) {
    const index = cartItems.findIndex(({ id: itemId }) => itemId === id);
    let { units, price, total } = cartItems[index];
    if (command == "add") {
      units += 1;
    } else {
      units = units === 1 ? units : units - 1;
    }
    total = price * units;
    total = Number(total.toFixed(2));
    cartItems[index].units = units;
    cartItems[index].total = total;
    setCartItems([...cartItems]);
  }

  if (cartItems.length === 0) {
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
      <div className="top-bar">
        Your Cart ({numberOfItems} {numberOfItems === 1 ? "item" : "items"})
      </div>

      <div className="items">
        {/* displaying items in the cart */}
        {cartItems.map(({ id, title, image, price, total, units }) => (
          <div key={id} className="item">
            <div>
              <img src={image} />
            </div>

            <div className="description">
              <p className="title">{title}</p>
              <p>price: {price}</p>
              <p>total: {total}</p>
              <div>
                <FontAwesomeIcon
                  className="icon"
                  icon={faCircleMinus}
                  onClick={() => {
                    addRemoveItem(id, "remove");
                  }}
                />
                {units}
                <FontAwesomeIcon
                  className="icon"
                  icon={faCirclePlus}
                  onClick={() => {
                    addRemoveItem(id, "add");
                  }}
                />
              </div>
            </div>
            <div
              className="remove"
              onClick={() => {
                // implementing deleting item from cart
                const newCart = cartItems.filter(
                  ({ id: itemId }) => itemId !== id
                );

                setCartItems(newCart);
              }}
            >
              Remove
            </div>
          </div>
        ))}
      </div>

      <div className="balance">
        <div>
          <p>Subtotal: </p>
          <p>${subTotal}</p>
        </div>
        <button
          onMouseDown={(e) => {
            e.currentTarget.style.scale = "0.98";
            ordersPopups.push("Order Placed");
            setOrdersPopups([...ordersPopups]);
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.scale = "1";
          }}
        >
          <p>Checkout</p>
          <FontAwesomeIcon className="icon" icon={faArrowRight} />
        </button>
      </div>

      <MessagePopups popupsArray={ordersPopups} />
    </div>
  );
}

export default Cart;
