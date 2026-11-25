import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.tsx";
import Home from "./components/Home"
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "trainings",
        element: <TrainingList />,
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "statistics",
        element:<Statistics />
      }
    ],
  },
], { basename: import.meta.env.BASE_URL });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
