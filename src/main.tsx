import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";

import { router } from "./routes/Routes.tsx";

export const API_START_URL = "http://localhost:8888";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
