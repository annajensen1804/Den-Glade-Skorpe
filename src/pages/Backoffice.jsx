import { useLoaderData } from "react-router";
import Ingredients from "../components/ingredients/Ingredients";


const Backoffice = () => {
    const { ingredients } = useLoaderData();
    return (
        <section>
            <Ingredients ingredients={ingredients} />
        </section>
    )
}

export default Backoffice;