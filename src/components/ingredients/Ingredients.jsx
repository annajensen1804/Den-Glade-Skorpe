import { useLoaderData } from "react-router";
import style from "./ingredients.module.css";
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
      const res = await fetch(`${serverPath}/ingredient`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing._id,
          name: data.name,
          description: data.description,
        }),
      });

      if (res.ok) {
        onClose(); 
      } else {
        console.log("Fejl ved opdatering", res.status);
      }
    } catch (error) {
      console.error("Netværksfejl:", error);
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

const handleDelete = async (ing) => {
    const sikker = window.confirm(`Vil du slette "${ing.name}"?`);
    
    if (!sikker) return;
    
    const res = await fetch(`${serverPath}/ingredient/${ing._id}`, {
        method: "DELETE",
    });
        if (!res.ok) return console.log("Kunne ikke slette", res.status);
        console.log("Slettet");
}

// List af ingredienser 
const Ingredients = () => {
  const ingredients = useLoaderData();
  const [editing, setEditing] = useState(null);

  return (
    <section className={style.container}>
      <h2>Ingredienser</h2>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing._id}>
            {ing.name} - {ing.description}
            <div className={style.buttons}>
              <button onClick={() => setEditing(ing)}>Rediger</button>

              <button onClick={() => handleDelete(ing)}>Slet</button>
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