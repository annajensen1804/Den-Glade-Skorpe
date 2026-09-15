import { serverPath } from "../settings";

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

// ═════════════════════════════════════════════════════════════════════════
// TODO (code-along): BACKOFFICE-loader
//
// Med modaler har vi KUN brug for én loader — backofficeLoader. Redigering
// sker via update() i useCrud (ikke via ruter/actions), og formularerne får
// det de skal bruge som props. Derfor henter loaderen også categories +
// ingredients (til dropdowns i tilføj/rediger-ret-modalen).
//
// Husk import øverst, når du bygger requireAuth:
//   import { redirect } from "react-router-dom";
//
// Skeleton at bygge:
//
// // Kræver login. Loaders har ikke React-context, så vi læser token direkte
// // fra localStorage og sender til /login, hvis den mangler.
// const requireAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw redirect("/login");
//   return token;
// };
//
// export const backofficeLoader = async () => {
//   requireAuth();
//   const [dishes, orders, messages, employees, categories, ingredients] =
//     await Promise.all([
//       getData("/dishes"), getData("/orders"), getData("/messages"),
//       getData("/employees"), getData("/categories"), getData("/ingredients"),
//     ]);
//   return { dishes, orders, messages, employees, categories, ingredients };
// };
// ═════════════════════════════════════════════════════════════════════════

/* export const backofficeLoader = async () => {
  const [dishes, orders, messages, employees, categories, ingredients] =
    await Promise.all([
      getData("/dishes"),
      getData("/orders"),
      getData("/messages"),
      getData("/employees"),
      getData("/categories"),
      getData("/ingredients"),
    ]);

    return { dishes, orders, messages, employees, categories, ingredients };
}; */