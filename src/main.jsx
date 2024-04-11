import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './Pages/Login/Login.jsx';
import WebBridgePortal from './Pages/WebBridgePortal/WebBridgePortal.jsx';
import AskTheExpert from './Pages/AskTheExpert/AskTheExpert.jsx';
import Portal from './Components/Portal/Portal.jsx';
import QueryManager from './Pages/QueryManager/QueryManager.jsx';
import AllQueries from './Pages/AllQueries/AllQueries.jsx';
import Admin from './Pages/Admin/Admin.jsx';
import 'react-toastify/dist/ReactToastify.css';

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
    ]
  },
  {
    path: "/admin/add-details/portal",
    element: <Admin />,
  },
  {
    path: "*",
    element: <h1 style={{color: "#fff", height: "100vh"}}>No found</h1>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
