import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/home.css";
import "../css/shop.css";

function sort(array, sortingCondition) {
  if (sortingCondition === "a-z") {
    array.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortingCondition === "z-a") {
    array.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortingCondition === "lowest") {
    array.sort((a, b) => a.price - b.price);
  } else if (sortingCondition === "highest") {
    array.sort((a, b) => b.price - a.price);
  }

  return array;
}

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

function GenerateProducts({ products }) {
  return (
    <div className="products">
      {products.map(({ id, title, price, image, description }) => (
        <Link
          to={`/products/${id}`}
          key={id}
          state={{
            id,
            title,
            price,
            image,
            description,
          }}
          className="product"
        >
          <div>
            <img src={image} />
            <div className="description">
              <p>{title}</p>
              <p>${price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Shop() {
  const { state: storeData } = useLocation();
  const [products, setProducts] = useState(storeData);
  const [searchProduct, setSearchProduct] = useState("");
  const [sortingCondition, setSortingCondition] = useState("a-z");

  return (
    <div>
      <div className="topbar">
        <Form
          searchProduct={searchProduct}
          handleSearchChange={(e) => {
            const search = e.target.value;
            setSearchProduct(search);
            let newProducts = storeData.filter(({ title }) =>
              String(title)
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(search.toLowerCase())
            );

            newProducts = sort(newProducts, sortingCondition);
            setProducts(newProducts);
          }}
          handleSelectChange={(e) => {
            const choice = e.target.value;
            const newProducts = sort(products, choice);
            setSortingCondition(choice);
            setProducts(newProducts);
          }}
        />

        <p>{products.length} products found</p>
      </div>

      <GenerateProducts products={products} />
    </div>
  );
}

export default Shop;
