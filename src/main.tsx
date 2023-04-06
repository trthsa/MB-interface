import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BookingView from "./views/BookingView";
import LoginViews from "./views/LoginViews";
import PageWrapper from "./Components/Layout/PageWrapper";

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
