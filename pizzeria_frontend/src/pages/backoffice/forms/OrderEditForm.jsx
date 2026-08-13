// TODO (code-along): Rediger en ordre — modal-indhold.
//   - Props: { order, dishes, onClose }  (ordren kommer med som prop — ingen loader).
//   - react-hook-form med defaultValues fra `order`: status, kommentarer, total pris.
//   - Behold order.dishes uændret (send dem med i update-kaldet).
//   - onSubmit: update(`order/${order._id}`, orderData) fra useCrud (PUT, JSON).
//   - Efter succes: onClose().

import { useCrud } from "../../../hooks/useCrud";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../components/button/Button";
import styles from "./form.module.css";
import { useState } from "react";
import ConfirmationForm from "./ConfirmationForm";

const OrderEditForm = ({ order, dishes, onClose }) => {
  const { update } = useCrud();

  // States for confirmation-modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const schema = yup.object().shape({
    status: yup.string().required("Status er påkrævet"),
    comments: yup.string().nullable(),
    totalPrice: yup
      .number()
      .typeError("Pris skal være et tal")
      .required("Total pris er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues forudfylder felterne med rettens nuværende data.
    defaultValues: {
      status: order?.status || "",
      comments: order?.comments || "",
      totalPrice: order?.totalPrice || order?.price || 0,
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

      formData.append("status", pendingData.status);
      formData.append("comments", pendingData.comments || "");
      formData.append("totalPrice", pendingData.totalPrice);
      formData.append("dishes", JSON.stringify(order.dishes));
    
    try {
      await update(`order/${order._id}`, formData);
      setShowConfirm(false);
      onClose();

    } catch (error) {
      console.log("Fejl ved opdatering af ordre:", error);
    }
  };

  // Viser bekræftelse-modal
        if (showConfirm) {
          return (
            <ConfirmationForm
              message={`Vil du gemme ændringerne for ordre # ${order._id}?`}
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
        <label>Bestille Retter:</label>
        <ul>
          {order?.dishes?.map((item, index) => {
            const currentDishId = item?.dish || item;
            const dish = dishes?.find((d) => d._id === item.dish);
            return dish ? (
              <li key={index}>
                {dish.title} {item.amount ? `(x${item.amount})` : ""}
              </li>
            ) : (
              <li key={index}>Ukendt ret</li>
            );
          })}
        </ul>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select id="status" {...register("status")}>
          <option value="Modtaget">Modtaget</option>
          <option value="I gang">I gang</option>
          <option value="Færdig">Færdig</option>
          <option value="Annulleret">Annulleret</option>
        </select>
        {errors.status && (
          <p className={styles.error}>{errors.status.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="comments">Kommentarer</label>
        <textarea id="comments" {...register("comments")} rows="3" />
        {errors.comments && (
          <p className={styles.error}>{errors.comments.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="totalPrice">Total pris (DKK)</label>
        <input id="totalPrice" type="number" {...register("totalPrice")} />
        {errors.totalPrice && (
          <p className={styles.error}>{errors.totalPrice.message}</p>
        )}
      </div>

      <Button
        type="submit"
        buttonText={isSubmitting ? "Gemmer..." : "Gem ændringer"}
      />
    </form>
  );
};;

export default OrderEditForm;
