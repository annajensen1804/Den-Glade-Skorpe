// TODO (code-along): Rediger en medarbejder — modal-indhold.
//   - Props: { employee, onClose }  (medarbejderen kommer med som prop — ingen loader).
//   - react-hook-form med defaultValues fra `employee`.
//   - onSubmit: byg FormData (husk id, kun fil hvis valgt) → update("employee", formData).
//   - Efter succes: onClose().

import { useCrud } from "../../../hooks/useCrud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../components/button/Button";
import styles from "./form.module.css";
import ConfirmationForm from "./ConfirmationForm";
import { useState } from "react";


const EmployeeEditForm = ({ employee, onClose }) => {
  const { update } = useCrud();

  // States for confirmation-modal
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingData, setPendingData] = useState(null);

  const schema = yup.object().shape({
      name: yup.string().required("Navn er påkrævet"),
      position: yup.string().required("Position er påkrævet"),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(schema),
      // defaultValues forudfylder felterne med rettens nuværende data.
      defaultValues: {
        name: employee.name,
        position: employee.position,
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
      formData.append("id", employee._id);
      formData.append("name", pendingData.name);
      formData.append("position", pendingData.position);
      if (pendingData.image && pendingData.image[0]) {
        formData.append("file", pendingData.image[0]);
      }
  
      try {
        await update("employee", formData);
        setShowConfirm(false);
        onClose();
      } catch {
        // Fejl vises allerede som toast fra useCrud.
      }
    };

    // Viser bekræftelse-modal
      if (showConfirm) {
        return (
          <ConfirmationForm
            message={`Vil du gemme ændringerne for "${pendingData?.name}"?`}
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
        <label htmlFor="name">Navn:</label>
        <input id="name" type="text" {...register("name")} />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="position">Position:</label>
        <input id="position" type="text" {...register("position")} />
        {errors.position && (
          <span className={styles.error}>{errors.position.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="image">Skift billede (valgfrit):</label>
        <input id="image" type="file" {...register("image")} />
      </div>

      <Button
        type="submit"
        buttonText={isSubmitting ? "Gemmer..." : "Opdater medarbejder"}
      />
    </form>
  );
};

export default EmployeeEditForm;
