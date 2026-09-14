import styles from "./category.module.css";
const Category = ({ category }) => {
  return (
    <figure className={styles.category}>
      <img src={category.image} alt={category.name} />
      <figcaption>
        <h3>{category.name}</h3>
      </figcaption>
    </figure>
  );
};

export default Category;
