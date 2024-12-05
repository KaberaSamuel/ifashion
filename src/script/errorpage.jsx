import { Link } from "react-router-dom";
import "../css/errorpage.css";

function ErrorPage() {
  return (
    <div className="error-page">
      <p>Page not found</p>
      <Link to={"/"}>Go back to homepage</Link>
    </div>
  );
}

export default ErrorPage;
