import styles from "./button.module.css";

// buttonText + onClick som før. 'variant' tildeler en ekstra klasse (fx small/red),
// så samme knap kan se forskellig ud alt efter hvor den bruges.
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
