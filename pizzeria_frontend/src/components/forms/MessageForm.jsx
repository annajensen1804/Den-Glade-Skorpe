import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import styles from "./form.module.css";
import Button from "../button/Button";
import { serverPath } from "../../settings";

const MessageForm = () => {
  // Yup valideringsskema - reglerne for hvad brugeren skal udfylde.
  const schema = yup.object().shape({
    name: yup.string().required("Navn er påkrævet"),
    subject: yup.string().required("Emne er påkrævet"),
    description: yup
      .string()
      .min(10, "Beskeden skal være på mindst 10 tegn")
      .required("Besked er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // react-hook-form giver os de validerede felter i "data".
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${serverPath}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Der skete en fejl..");
      } else {
        Swal.fire({
          icon: "success",
          title: `Tak for din besked, ${data.name}!`,
          text: "Vi vender tilbage hurtigst muligt.",
        });
        reset();
      }
    } catch (error) {
      console.error("Fejl:", error);
      toast.error("Der skete en fejl..");
    }
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='name'>Navn</label>
        <input id='name' type='text' {...register("name")} />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor='subject'>Emne</label>
        <input id='subject' type='text' {...register("subject")} />
        {errors.subject && (
          <span className={styles.error}>{errors.subject.message}</span>
        )}
      </div>

      <div>
        <label htmlFor='description'>Beskrivelse</label>
        <textarea id='description' rows='5' {...register("description")} />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      <Button buttonText={isSubmitting ? "Sender..." : "Send"} type='submit' />
    </form>
  );
};

export default MessageForm;
