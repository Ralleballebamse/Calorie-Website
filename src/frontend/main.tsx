import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import HomePage from "./homePage.tsx";
import LoginAccount from './pages/authPage/loginAccount.tsx';
import CreateAccount from './pages/authPage/createAccount.tsx';
import DashBoard from "./pages/dashboard/dashboard.tsx";
import Tracking from "./pages/Tracking/tracking.tsx";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginAccount />,
      },
      {
        path: "/create",
        element: <CreateAccount />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/tracking",
        element: <Tracking />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </StrictMode>,
);
