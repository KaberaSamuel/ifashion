import { useParams, useLocation } from "react-router-dom";

function Product() {
  const { productId } = useParams();
  const { state } = useLocation();

  return <div>welcome to product {productId}</div>;
}

export default Product;
