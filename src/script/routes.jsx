import App from "./App.jsx";
import Shop from "./shop.jsx";
import Login from "./login.jsx";
import Cart from "./cart.jsx";
import Home from "./home.jsx";
import ErrorPage from "./errorpage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "home",
        element: <Home />,
      },

      {
        path: "shop",
        element: <Shop />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
