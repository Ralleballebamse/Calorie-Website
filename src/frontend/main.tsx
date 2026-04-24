import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import HomePage from "./homePage.tsx";
import LoginPage from './loginpage/loginpage';
import DashBoard from "./dashboard/dashboard.tsx";
import Tracking from "./Tracking/tracking.tsx";
import Feature from "./Feature/feature.tsx";


const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/tracking",
        element: <Tracking />,
      },
      {
        path: "/feature",
        element: <Feature />,
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
