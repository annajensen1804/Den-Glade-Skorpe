import styles from "./cardItem.module.css";

const CardItem = ({ item }) => {
  return (
    <figure className={styles.cardItem}>
      <figcaption>
        <header>
          <span>{item.amount} X</span>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
        </header>
        {item.extraIngredients?.length > 0 && (
          <div>
            <p>Ekstra:</p>
            {item.extraIngredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </div>
        )}
        {item.size === "Familie" && (
          <div>
            <p>Størrelse:</p>
            <span> {item.size}</span>
          </div>
        )}

        <h5>Pris: {item.amount * item.price} DKK</h5>
      </figcaption>
    </figure>
  );
};

export default CardItem;
