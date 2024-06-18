import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Pages
import Test from "./Pages/Test/Test.jsx";
import Login from "./Pages/Login/Login.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import About from "./Components/About/About.jsx";
import Portal from "./Components/Portal/Portal.jsx";
import Register from "./Pages/Register/Register.jsx";
import AllQueries from "./Pages/AllQueries/AllQueries.jsx";
import TestResult from "./Pages/TestResult/TestResult.jsx";
import TestYourself from "./Pages/TestYourself/TestYourself.jsx";
import QueryManager from "./Pages/QueryManager/QueryManager.jsx";
// import AskTheExpert from "./Pages/AskTheExpert/AskTheExpert.jsx";
import Announcements from "./Components/Announcements/Announcements.jsx";
import WebBridgePortal from "./Pages/WebBridgePortal/WebBridgePortal.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import Solutions from "./Pages/Solutions/Solutions.jsx";

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
        path: "/test",
        element: <Test />,
      },
      {
        path: "/dashboard",
        element: <WebBridgePortal />,
        children: [
          {
            path: "getting-started",
            element: <Portal />,
          },
          {
            path: "solutions/test-result/:id",
            element: <Solutions />,
          },
          {
            path: "test-result/:id",
            element: <TestResult />,
          },
          {
            path: "laws-and-rules",
            element: <Portal />,
          },
          // {
          //   path: "faqs",
          //   element: <AskTheExpert />,
          // },
          {
            path: "ask-the-expert",
            element: <QueryManager />,
          },
          {
            path: "my-queries",
            element: <AllQueries />,
          },
          {
            path: "announcements",
            element: <Announcements />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "test-yourself",
            element: <TestYourself />,
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
