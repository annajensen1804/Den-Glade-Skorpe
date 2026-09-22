import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Contact from "./pages/Contact";
import Basket from "./pages/Basket";
import Login from "./pages/login/Login";
import DishDetails from "./pages/dishDetails/DishDetails";
import NotFound from "./pages/404";
import Loading from "./components/loading/Loading";
import ErrorElement from "./components/feedbackElements/ErrorElement";
import {
  
  backofficeLoader,
  dishDetailsLoader,
  employeesLoader,
  homeLoader,
  ingredientsLoader,
} from "./loaders/DataLoaders";
import { basename } from "./settings";
import Ingredients from "./components/ingredients/Ingredients";
import Backoffice from "./pages/Backoffice";
/* import Backoffice from "./pages/backoffice/Backoffice"; */
/* import DishesSection from "./pages/backoffice/components/DishesSection";
import EmployeesSection from "./pages/backoffice/components/EmployeesSection"; */

// ── TODO (code-along): backoffice-imports — fjern kommentar i Trin 1 ──
// import ProtectedRoute from "./components/ProtectedRoute";
// import Backoffice from "./pages/backoffice/Backoffice";
// import { backofficeLoader } from "./loaders/DataLoaders";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayout />} hydrateFallbackElement={<Loading />}>
        <Route
          index
          element={<Home />}
          loader={homeLoader}
          errorElement={<ErrorElement />}
        />
        <Route
          path="employees"
          element={<Employees />}
          loader={employeesLoader}
          errorElement={<ErrorElement />}
        />
        <Route
          path="dish/:dishId"
          element={<DishDetails />}
          loader={dishDetailsLoader}
          errorElement={<ErrorElement />}
        />

{/*         <Route
          path="ingredients"
          element={<Ingredients />}
          loader={ingredientsLoader}
          errorElement={<ErrorElement />}
        /> */}

        <Route path="contact" element={<Contact />} />
        <Route path="basket" element={<Basket />} />
        <Route path="login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* <Route element={<ProtectedRoute />}> */}

      <Route
        path="backoffice"
        element={<Backoffice />}
        loader={backofficeLoader}
        errorElement={<ErrorElement />}
      /> 

    </Route>,
  ),
  { basename },
);

export default routes;

