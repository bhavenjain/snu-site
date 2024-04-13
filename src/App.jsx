import React from "react";
import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Pages
import Login from "./Pages/Login/Login.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import Portal from "./Components/Portal/Portal.jsx";
import Register from "./Pages/Register/Register.jsx";
import AllQueries from "./Pages/AllQueries/AllQueries.jsx";
import AskTheExpert from "./Pages/AskTheExpert/AskTheExpert.jsx";
import QueryManager from "./Pages/QueryManager/QueryManager.jsx";
import WebBridgePortal from "./Pages/WebBridgePortal/WebBridgePortal.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <WebBridgePortal />,
        children: [
          {
            path: "web-bridge-portal",
            element: <Portal />,
          },
          {
            path: "faqs",
            element: <AskTheExpert />,
          },
          {
            path: "ask-the-expert",
            element: <QueryManager />,
          },
          {
            path: "my-queries",
            element: <AllQueries />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/add-details/portal",
    element: <Admin />,
  },
  {
    path: "*",
    element: <h1 style={{ color: "#fff", height: "100vh" }}>No found</h1>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
