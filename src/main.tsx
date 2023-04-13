import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactDOM from "react-dom/client";
import App from "./App";

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageWrapper from "./components/Layout/PageWrapper";
import { AdminMenuLink } from "./components/SideMenu";
import "./index.css";
import AdminPage from "./pages/Admin";
import FilghtRoutePage from "./pages/AdminMenuPages/FilghtRoutePage";
import FlightPage from "./pages/AdminMenuPages/FlightPage";
import BookingView from "./views/BookingView";
import LoginViews from "./views/LoginViews";
import InvoicePage from "./pages/AdminMenuPages/InvoicePage";

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
        path: AdminMenuLink.Flight,
        element: <FlightPage />,
      },
      {
        path: AdminMenuLink.FlightRoute,
        element: <FilghtRoutePage />,
      },
      {
        path: AdminMenuLink.Invoice,
        element: <InvoicePage />,
      },
      {
        path: AdminMenuLink.None,
        element: (
          <div className="flex h-full justify-center items-center cursor-pointer">
            <p className="text-2xl bg-sky-500 text-white p-5 rounded-full">
              Hãy chọn menu!
            </p>
          </div>
        ),
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
