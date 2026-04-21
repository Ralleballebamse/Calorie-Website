import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import HomePage from "./homePage.tsx";
import LoginPage from './loginpage/loginpage'

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
      }
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
