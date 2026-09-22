import { useLoaderData } from "react-router";
import style from "./ingredients.module.css";
import { useCrud } from "../../hooks/useCrud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { serverPath } from "../../settings";
import { useState } from "react";

// Fælles validering skema
const schema = yup.object().shape({
  name: yup.string().required("Navn er påkrævet"),
  description: yup.string().required("Beskrivelsen er påkrævet"),
});

// Oprettelse form
const IngForm = () => {
    const { create } = useCrud();
    
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
     await create("ingredient", data);
      console.log("Oprettet!");
      reset();
    } catch (error) {
        console.error("Netværksfejl", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h3>Opret ny ingrediens</h3>
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

// Redigering form
const EditIngForm = ({ editing, onClose }) => {
    const { update } = useCrud();
    
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: editing.name,
      description: editing.description,
    },
  });

  const onSubmit = async (data) => {
    try {
        await update("ingredient", {
          id: editing._id,
          name: data.name,
          description: data.description,
      });
      console.log("Opdateret!")
      onClose();
    } catch (error) {
      console.error("Netværksfejl:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <h3>Rediger ingrediens</h3>
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
        {isSubmitting ? "Opdaterer..." : "Opdater ingrediens"}
      </button>

    </form>
  );
};

// List af ingredienser 
const Ingredients = () => {
  const ingredients = useLoaderData();
  const [editing, setEditing] = useState(null);

  const { remove } = useCrud();

  return (
    <section className={style.container}>
      <h2>Ingredienser</h2>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing._id}>
            {ing.name} - {ing.description}
            <div className={style.buttons}>
              <button onClick={() => setEditing(ing)}>Rediger</button>

              <button onClick={() => remove("ingredient", ing._id)}>Slet</button>
            </div>
          </li>
        ))}
      </ul>

      <IngForm />

      {editing && (
        <EditIngForm
          key={editing._id}
          editing={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </section>
  );
};

export default Ingredients;