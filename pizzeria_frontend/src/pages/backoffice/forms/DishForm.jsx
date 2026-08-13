// TODO (code-along): Opret EN ny ret — vises som indhold i en modal.
//   - Props: { categories, ingredients, onClose }  (data kommer fra Backoffice).
//   - Brug react-hook-form + yup: titel, pris (normal/familie),
//     ingredienser (multiselect), kategori, billede (file).
//   - onSubmit: byg FormData (pga. billed-upload) og kald create("dish", formData)
//     fra useCrud. useCrud kører selv revalidate() + toast.
//   - Efter succes: onClose()  (luk modalen — ingen navigate).

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCrud } from "../../../hooks/useCrud";
import Button from "../../../components/button/Button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DishForm = ({ ingredients, categories, onClose }) => {
  const { create } = useCrud();

const schema = yup.object().shape({
  title: yup.string().required("Titel er påkrævet"),
  priceNormal: yup.number().typeError("Pris skal være et tal").required("Pris er påkrævet"),
  priceFamily: yup.number().transform((value, original) => (original === "" ? undefined : value)).typeError("Pris skal være et tal"),
  category: yup.string().required("Vælg en kategori"),
})

const {
  register,
  handleSubmit,
  formState: {errors, isSubmitting},
} = useForm({resolver: yupResolver(schema)})

const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", JSON.stringify({normal: Number(data.priceNormal), family: data.priceFamily ? Number(data.priceFamily) : 0}));
  formData.append("ingredients", data.ingredients);
  formData.append("category", data.category);
  if (data.file && data.file[0]) {
    formData.append("file", data.file[0]);
  }

  try {
    await create("dish", formData);
    onClose();
  } catch (error) {
    console.error("Fejl ved oprettelse af ret:", error);
  }
}

  return (

  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="title">Titel</label>
      <input id="title" {...register("title")} />
      {errors.title && <span className="error">{errors.title.message}</span>}
    </div>

    <div>
      <label htmlFor="priceNormal">Pris (normal)</label>
      <input id="priceNormal" {...register("priceNormal")} />
      {errors.priceNormal && (
        <span className="error">{errors.priceNormal.message}</span>
      )}
    </div>

    <div>
      <label htmlFor="priceFamily">Pris (familie)</label>
      <input id="priceFamily" {...register("priceFamily")} />
      {errors.priceFamily && (
        <span className="error">{errors.priceFamily.message}</span>
      )}
    </div>

    <div>
      <label htmlFor="ingredients">Ingredienser</label>
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
        <span className="error">{errors.category.message}</span>
      )}
    </div>

    <div>
      <label>Vælg billede</label>
      <input id="image" type="file" {...register("image")} />
    </div>

    <Button type="submit" buttonText={isSubmitting ? "Gemmer..." : "Tilføq ret"} />
  </form>
  )
};

export default DishForm;
