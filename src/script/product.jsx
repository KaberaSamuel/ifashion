import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppUIContext, CartContext } from "./App";
import { MessagePopups } from "./MessagePopups";
import "../css/product.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Product() {
  const { setBgColor } = useContext(AppUIContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { state: productData } = useLocation();
  const { id, image, title, price, description } = productData;
  const [popupsArray, setMessagesArray] = useState([]);

  useEffect(() => {
    setBgColor("var(--black)");
    return () => {
      setBgColor("var(--white)");
    };
  }, []);

  return (
    <div className="product-page">
      <img src={image} />
      <p>{title}</p>
      <p>${price}</p>
      <button
        onClick={() => {
          // adding new product in the cart
          const cartItem = {
            id,
            image,
            title,
            price,
            units: 1,
            total: price,
          };
          let isInCart = false;

          cartItems.forEach(({ id: productId }) => {
            if (productId === cartItem.id) {
              isInCart = true;
            }
          });

          let message;
          if (!isInCart) {
            cartItems.push(cartItem);
            message = "Item added to the cart";
            setCartItems([...cartItems]);
          } else {
            message = "Already in the cart";
          }

          popupsArray.push(message);
          setMessagesArray([...popupsArray]);
        }}
      >
        Add to cart
      </button>
      <div className="description">
        <p>Description</p>
        <p>{description}</p>
      </div>

      <MessagePopups popupsArray={popupsArray} />
    </div>
  );
}

export default Product;
