// TODO (code-along): Opret EN ny medarbejder — modal-indhold.
//   - Props: { onClose }.
//   - react-hook-form + yup: navn, position, billede (file).
//   - onSubmit: byg FormData → create("employee", formData) fra useCrud.
//   - Efter succes: onClose().

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCrud } from "../../../hooks/useCrud";
import Button from "../../../components/button/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = ({ onClose }) => {
  const { create } = useCrud();

  const schema = yup.object().shape({
    name: yup.string().required("Navn er påkrævet"),
    position: yup.string().required("Position er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      await create("employee", formData);
      onClose();
    } catch (error) {
      console.error("Fejl ved oprettelse af medarbejder:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Navn</label>
        <input id="name" {...register("name")} />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="position">Position</label>
        <input id="position" {...register("position")} />
        {errors.position && <span className="error">{errors.position.message}</span>}
      </div>

      <div>
        <label>Vælg billede</label>
        <input id="image" type="file" {...register("file")} />
      </div>

      <Button
        type="submit"
        buttonText={isSubmitting ? "Gemmer..." : "Tilføj medarbejder"}
      />
    </form>
  );
};

export default EmployeeForm;
