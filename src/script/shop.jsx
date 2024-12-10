import { useState, useEffect } from "react";
import "../css/home.css";
import "../css/shop.css";

function Form({ searchProduct, handleSearchChange, handleSelectChange }) {
  return (
    <form>
      <input
        type="text"
        value={searchProduct}
        onChange={handleSearchChange}
        placeholder="Search"
        className="input"
      />

      <div>
        <label>Sort: </label>
        <select className="input" onChange={handleSelectChange}>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="lowest">Lowest(price)</option>
          <option value="highest">Highest(price)</option>
        </select>
      </div>
    </form>
  );
}

function GenerateProducts({ data }) {
  return (
    <ul className="products">
      {data.map(({ id, title, price, image }) => (
        <li key={id} className="product">
          <img src={image} />
          <div className="description">
            <p>{title}</p>
            <p>${price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Shop() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?sort=asc")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setProducts(result);
      });
  }, []);

  return (
    <div>
      <div className="topbar">
        <Form
          searchProduct={searchProduct}
          handleSearchChange={(e) => {
            const search = e.target.value;
            setSearchProduct(e.target.value);
            const newProducts = data.filter(({ title }) =>
              String(title).toLowerCase().includes(search)
            );
            setProducts(newProducts);
          }}
          handleSelectChange={(e) => {
            const choice = e.target.value;
            let newProducts;
            if (choice === "a-z") {
              newProducts = products.toSorted((a, b) =>
                a.title.localeCompare(b.title)
              );
            } else if (choice === "z-a") {
              newProducts = products.toSorted((a, b) =>
                b.title.localeCompare(a.title)
              );
            } else if (choice === "lowest") {
              newProducts = products.toSorted((a, b) => a.price - b.price);
            } else if (choice === "highest") {
              newProducts = products.toSorted((a, b) => b.price - a.price);
            }

            setProducts(newProducts);
          }}
        />

        <p>{products.length} products found</p>
      </div>

      <GenerateProducts data={products} />
    </div>
  );
}

export default Shop;
