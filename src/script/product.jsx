import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppUIContext } from "./App";
import { CartContext } from "./App";
import "../css/product.css";

function Product() {
  const { setBgColor } = useContext(AppUIContext);
  const { cartData, setCartData } = useContext(CartContext);
  const { state: productData } = useLocation();
  const { id, image, title, price, description } = productData;

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
          const cartItem = { id, image, title, price };
          let isInCart = false;
          cartData.forEach(({ id: productId }) => {
            if (productId === cartItem.id) {
              isInCart = true;
            }
          });

          if (!isInCart) {
            cartData.push(cartItem);
            setCartData([...cartData]);
          } else {
            alert("already present");
          }
        }}
      >
        Add to cart
      </button>
      <div className="description">
        <p>Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Product;
