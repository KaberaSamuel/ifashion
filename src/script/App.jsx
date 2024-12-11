import "../css/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faHouse,
  faShop,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?sort=asc")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.toSorted((a, b) =>
          a.title.localeCompare(b.title)
        );
        setData(sortedData);
      });
  }, []);

  return (
    <div className="app">
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
            <Link to={"shop"} state={data}>
              <FontAwesomeIcon icon={faShop} />
              <p>Shop</p>
            </Link>
          </div>
          <div>
            <Link to={"cart"}>
              <FontAwesomeIcon icon={faShoppingCart} />
              <p>Cart</p>
              <div className="cart-amounts">0</div>
            </Link>
          </div>
        </div>

        <div>
          <a href="#">Help</a>
          <a href="#">Contact Us</a>
        </div>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
