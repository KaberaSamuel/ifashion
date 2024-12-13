import { useContext } from "react";
import { CartContext } from "./App";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);

  // console.log(cartData);
  return (
    <div>
      <div>Welcome to the items you've bought</div>
      {cartData.map(({ id, title }) => (
        <div
          key={id}
          style={{
            margin: "20px 0",
            padding: "10px",
            border: "1px solid var(--black)",
          }}
        >
          <p>{id}</p>
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
