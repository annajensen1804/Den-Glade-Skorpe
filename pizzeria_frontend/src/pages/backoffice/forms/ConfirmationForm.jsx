import Button from "../../../components/button/Button";
import styles from "./form.module.css";

const ConfirmationForm = ({ message, onConfirm, onCancel }) => {
    return (
      <div className={styles.confirmModal}>
        <p>{message}</p>
        <Button
          type="button"
          onClick={onConfirm}
          variant="small"
          buttonText="Ja"
        />
        <Button
          type="button"
          onClick={onCancel}
          variant="red"
          buttonText="Nej"
        />
      </div>
    );
}

export default ConfirmationForm;