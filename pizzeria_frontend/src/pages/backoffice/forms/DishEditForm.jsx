// TODO (code-along): Rediger en ret — vises som indhold i en modal.
//   - Props: { dish, categories, ingredients, onClose }.
//     Retten kommer med som prop (fra listen) — vi behøver INGEN loader.
//   - Brug react-hook-form med defaultValues fra `dish` til at forudfylde felterne.
//   - onSubmit: byg FormData (husk _id og kun fil hvis valgt) og kald
//     update("dish", formData) fra useCrud (PUT). useCrud kører revalidate() + toast.
//   - Efter succes: onClose().

import { useCrud } from "../../../hooks/useCrud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../components/button/Button";
import styles from "./form.module.css";
import { useState } from "react";
import ConfirmationForm from "./ConfirmationForm";
import { toast } from "react-toastify";

const DishEditForm = ({ dish, categories, ingredients, onClose }) => {
  const { update } = useCrud();

  // States for confirmation-modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const schema = yup.object().shape({
    title: yup.string().required("Titel er påkrævet"),
    priceNormal: yup
      .number()
      .typeError("Pris skal være et tal")
      .required("Pris er påkrævet"),
    priceFamily: yup
      .number()
      .transform((value, original) => (original === "" ? undefined : value))
      .typeError("Pris skal være et tal"),
    category: yup.string().required("Vælg en kategori"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues forudfylder felterne med rettens nuværende data.
    defaultValues: {
      title: dish.title,
      priceNormal: dish.price?.normal,
      priceFamily: dish.price?.family,
      ingredients: dish.ingredients,
      category: dish.category?.name || dish.category,
    },
  });

  const handlePreSubmit = (data) => {
    setPendingData(data); // Gemmer data fra input-felterne i modal
    setShowConfirm(true); // Viser bekræftelse-modal
  };

  // Når vi trykker på Ja-knappen
  const handleActualSubmit = async () => {
    if (!pendingData) return;

    const formData = new FormData();
    formData.append("id", dish._id);
    formData.append("title", pendingData.title);
    formData.append(
      "price",
      JSON.stringify({
        normal: Number(pendingData.priceNormal),
        family: pendingData.priceFamily ? Number(pendingData.priceFamily) : 0,
      }),
    );
    formData.append("ingredients", pendingData.ingredients);
    formData.append("category", pendingData.category);
    if (pendingData.image && pendingData.image[0]) {
      formData.append("file", pendingData.image[0]);
    }

    try {
      await update("dish", formData);
      toast.success("Retten blev opdateret!")
      setShowConfirm(false)
      onClose();
    } catch {
      // Fejl vises allerede som toast fra useCrud.
    }
  };

  // Viser bekræftelse-modal
  if (showConfirm) {
    return (
      <ConfirmationForm
        message={`Vil du gemme ændringerne for "${pendingData?.title}"?`}
        onConfirm={handleActualSubmit}
        onCancel={() => {
          setShowConfirm(false);
          setPendingData(null); 
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(handlePreSubmit)} className={styles.form}>
      <div>
        <label htmlFor="title">Titel:</label>
        <input id="title" type="text" {...register("title")} />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="priceNormal">Pris (normal):</label>
        <input id="priceNormal" type="number" {...register("priceNormal")} />
        {errors.priceNormal && (
          <span className={styles.error}>{errors.priceNormal.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="priceFamily">Pris (familie):</label>
        <input id="priceFamily" type="number" {...register("priceFamily")} />
        {errors.priceFamily && (
          <span className={styles.error}>{errors.priceFamily.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="ingredients">Ingredienser:</label>
        <select id="ingredients" multiple {...register("ingredients")}>
          {ingredients.map((ing) => (
            <option key={ing._id} value={ing.name}>
              {ing.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category">Kategori:</label>
        <select id="category" {...register("category")}>
          <option value="">Vælg</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles.error}>{errors.category.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="image">Skift billede (valgfrit):</label>
        <input id="image" type="file" {...register("image")} />
      </div>

      <Button
        type="submit"
        buttonText={isSubmitting ? "Gemmer..." : "Opdater ret"}
      />
    </form>
  );
};

export default DishEditForm;
