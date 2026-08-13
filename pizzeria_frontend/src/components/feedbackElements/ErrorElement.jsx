import { useRouteError } from "react-router-dom";
import styles from "./errorElement.module.css";

/* Vises via 'errorElement' på vores ruter, hvis en loader eller action fejler.
   useRouteError() giver os fejlen, så vi kan vise en pæn besked i stedet for
   en hvid skærm - godt for brugeroplevelsen. */
const ErrorElement = () => {
  const error = useRouteError();
  return (
    <section className={styles.error}>
      <h2>Noget gik galt..</h2>
      <p>{error?.data || error?.message || "Prøv igen senere."}</p>
    </section>
  );
};

export default ErrorElement;
