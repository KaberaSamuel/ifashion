import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppUIContext } from "./App";
import { CartContext } from "./App";
import "../css/product.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MessageElements({ messagesArray }) {
  const messagesRef = useRef(null);
  const messagesNode = messagesRef.current;

  return (
    <div className="messages" ref={messagesRef}>
      {messagesArray.map((message, index) => (
        <div
          key={index}
          className="message"
          onAnimationEnd={(e) => {
            if (e.animationName === "slide-out") {
              messagesNode.removeChild(e.target);
            }
          }}
        >
          <div className="icon">
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <p>{message}</p>
          <div className="loader">
            <div className="filler"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Product() {
  const { setBgColor } = useContext(AppUIContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { state: productData } = useLocation();
  const { id, image, title, price, description } = productData;
  const [messagesArray, setMessagesArray] = useState([]);

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
            quantity: 1,
            total: price,
          };
          let isInCart = false;

          cartData.forEach(({ id: productId }) => {
            if (productId === cartItem.id) {
              isInCart = true;
            }
          });

          let message;
          if (!isInCart) {
            cartData.push(cartItem);
            message = "Item added to the cart";
            setCartData([...cartData]);
          } else {
            message = "Already in the cart";
          }

          messagesArray.push(message);
          setMessagesArray([...messagesArray]);
        }}
      >
        Add to cart
      </button>
      <div className="description">
        <p>Description</p>
        <p>{description}</p>
      </div>

      <MessageElements messagesArray={messagesArray} />
    </div>
  );
}

export default Product;
