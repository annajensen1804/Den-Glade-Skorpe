import { serverPath } from "../settings";
import { redirect } from "react-router-dom";

/* Loaders HENTER data, før en side vises (kaldes automatisk af React Router).
   Resultatet læses i komponenten med useLoaderData().

   OBS: API'et pakker svar ind i et objekt: { data: ... }.
   Derfor returnerer vi 'json.data' fra vores loaders. */

// Lille hjælper, så vi ikke gentager fetch + fejltjek + udpakning overalt.
const getData = async (path, errorText = "Fejl ved hentning") => {
  const res = await fetch(`${serverPath}${path}`);
  if (!res.ok) throw new Response(errorText, { status: res.status });
  const json = await res.json();
  return json.data;
};

// Forside: henter retter OG kategorier parallelt med Promise.all.
export const homeLoader = async () => {
  const [dishes, categories] = await Promise.all([
    getData("/dishes"),
    getData("/categories"),
  ]);
  return { dishes, categories };
};

// Ingredienser-loader
export const ingredientsLoader = async () => {
  return getData("/ingredients")
}

// Personale-siden
export const employeesLoader = async () => {
  return getData("/employees");
};

// Ret-detaljer: henter den ENE ret + alle ingredienser.
export const dishDetailsLoader = async ({ params }) => {
  const [dish, ingredients] = await Promise.all([
    getData(`/dish/${params.dishId}`, "Ret ikke fundet"),
    getData("/ingredients"),
  ]);
  return { dish, ingredients };
};



// Kræver login. Loaders har ikke React-context, så vi læser token direkte
// fra localStorage og sender til /login, hvis den mangler.

const requireAuth = () => {
  const token = localStorage.getItem("token");
    if (!token) throw redirect("/login");
    return token;
};

export const backofficeLoader = async () => {
  requireAuth();
  
  const [dishes, employees, categories, ingredients] =
  await Promise.all([
  getData("/dishes"), getData("/employees"), getData("/categories"), getData("/ingredients"),
]);
  return { dishes, employees, categories, ingredients };
};
 