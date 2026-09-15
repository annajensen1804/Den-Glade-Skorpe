import { useLoaderData } from 'react-router';
import style from "./ingredients.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import { serverPath } from '../../settings';

// Form til at oprette en ny ingrediens
const IngForm = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Navn er påkrævet"),
    description: yup
      .string()
      .min(10, "Beskrivelsen skal være på mindst 10 tegn")
      .required("Beskrivelsen er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${serverPath}/ingredient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return console.log("Fejl", res.status);
      console.log("Oprettet:", await res.json());
      reset(); 
    } catch (error) {
      console.error("Netværksfejl:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <div>
        <input {...register("name")} placeholder="Navn" />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <textarea {...register("description")} placeholder="Beskrivelse" />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Gemmer..." : "Gem ingrediens"}
      </button>
    </form>
  );
};

const Ingredients = () => {
    const ingredients = useLoaderData();

    return (
      <section className={style.container}>
        <h2>Ingredienser</h2>
        <ul>
          {ingredients.map((ing) => (
            <li key={ing._id}>
              {ing.name} - {ing.description}
            </li>
          ))}
        </ul>
        <IngForm />
      </section>
    );
}

export default Ingredients;
