import styles from "./button.module.css";

const Button = ({ buttonText, type = "button", onClick, variant = "default" }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant] || ""}`}
      onClick={onClick}
      type={type}>
      <h4>{buttonText}</h4>
    </button>
  );
};

export default Button;
