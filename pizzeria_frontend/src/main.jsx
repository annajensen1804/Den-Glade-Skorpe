import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

/* RouterProvider er 'containeren' for hele projektet.
Den fungerer som en såkaldt 'provider', der sørger for at rendere
forskelligt indhold (komponenter) baseret på url'en. */

// Her hentes html-elementet med id'et 'root' fra dommen. Dommen 'kobles' på.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
