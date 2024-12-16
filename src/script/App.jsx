import "../css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faHouse,
  faShop,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";

export const AppUIContext = createContext(null);
export const CartContext = createContext(null);

function Sidebar({ storeData }) {
  const { cartData } = useContext(CartContext);
  return (
    <aside className="sidebar">
      <div>
        <Link to="home" className="logo">
          {" "}
          <p>
            Urban <br /> Monkey
          </p>
          <img src="src/assets/monkey-logo.png" alt="logo" />
        </Link>
      </div>

      <div className="links">
        <div>
          <Link to={"login"}>
            <FontAwesomeIcon icon={faRightToBracket} />
            <p>Login</p>
          </Link>
        </div>
        <div>
          <Link to={"home"}>
            <FontAwesomeIcon icon={faHouse} />
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link to={"shop"} state={storeData}>
            <FontAwesomeIcon icon={faShop} />
            <p>Shop</p>
          </Link>
        </div>
        <div>
          <Link state={storeData} to={"cart"}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <p>Cart</p>
            <div className="cart-amounts">{cartData.length}</div>
          </Link>
        </div>
      </div>

      <div>
        <a href="#">Help</a>
        <a href="#">Contact Us</a>
      </div>
    </aside>
  );
}

function App() {
  const [bgColor, setBgColor] = useState("var(--white)");
  const [storeData, setStoreData] = useState([]);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?sort=asc")
      .then((res) => res.json())
      .then((storeData) => {
        const sortedData = storeData.toSorted((a, b) =>
          a.title.localeCompare(b.title)
        );
        setStoreData(sortedData);
      });
  }, []);

  return (
    <AppUIContext.Provider value={{ setBgColor }}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <div className="app" style={{ backgroundColor: bgColor }}>
          <Sidebar storeData={storeData} />
          <main>
            <Outlet />
          </main>
        </div>
      </CartContext.Provider>
    </AppUIContext.Provider>
  );
}

export default App;
