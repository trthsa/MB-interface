import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactDOM from "react-dom/client";
import App from "./App";

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageWrapper from "./components/Layout/PageWrapper";
import "./index.css";
import AdminPage from "./pages/Admin";
import FlightPage from "./pages/AdminMenuPages/FlightPage";
import BookingView from "./views/BookingView";
import LoginViews from "./views/LoginViews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book",
    element: <BookingView />,
  },
  {
    path: "/acc_logging",
    element: <LoginViews />,
  },
  {
    path: "admin",
    element: <AdminPage />,

    children: [
      {
        path: "flight",
        element: <FlightPage />,
      },
      {
        path: "flightRoute",
        element: <div>FlightRoute</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageWrapper>
        <RouterProvider router={router} />
      </PageWrapper>
    </LocalizationProvider>
  </React.StrictMode>
);
