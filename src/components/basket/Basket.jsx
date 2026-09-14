import basket_icon from "/basket_icon.png";
import styles from "./basket.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";

const Basket = () => {
  const [items] = useLocalStorage("Basket", []);

  // Mapper over items for at få et array med amount værdierne
  let amount = items.map((item) => item.amount);
  // let quantity = items.length;

  // Bruger reduce til at lægge alle værdierne i amount arrayet sammen
  let totalAmount = amount.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={styles.basket}>
      <img src={basket_icon} alt='basket' />
      <span>{totalAmount}</span>
    </div>
  );
};

export default Basket;
