import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";
import styles from "./dishDetails.module.css";

// useLoaderData() henter det, dishDetailsLoader returnerede: { dish, ingredients }.
const DishDetails = () => {
  const { dish, ingredients } = useLoaderData();
  const [selectedSize, setSelectedSize] = useState("");
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [, setCardItems] = useLocalStorage("Basket", []);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleIngredientChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setExtraIngredients(selectedOptions);
  };

  const handleOrder = () => {
    if (!selectedSize) {
      toast.warning("Vælg venligst en størrelse før du bestiller.");
      return;
    }

    const price =
      selectedSize === "Familie" ? dish?.price?.family : dish?.price?.normal;

    const orderItem = {
      id: dish._id,
      title: dish?.title,
      size: selectedSize,
      price: price,
      amount: 1,
      image: dish?.image,
      extraIngredients: extraIngredients,
    };

    setCardItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === dish._id && item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += 1;
        return updatedItems;
      }

      return [...prevItems, orderItem];
    });

    toast.success(`${dish?.title} er lagt i kurven!`);
  };

  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle={`${dish?.title?.toUpperCase()}`} />
      <div className={styles.imgContainer}>
        <img src={dish?.image} alt={dish?.title} />
      </div>
      <section className={styles.detailSection}>
        <h3>{dish?.title}</h3>
        <ul>
          {dish?.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        {/* Tilføj ekstra ingredienser */}
        <h3>Tilføj ekstra ingredienser</h3>
        <select
          multiple
          value={extraIngredients}
          onChange={handleIngredientChange}>
          {ingredients.map((ingredient) => (
            <option value={ingredient.name} key={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </section>

      {/* Vælg størrelse */}
      <section className={styles.detailSection} style={{ background: "none" }}>
        <h3>Vælg størrelse</h3>
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value='' disabled>
            Vælg størrelse
          </option>
          <option value='Familie'>Familie</option>
          <option value='Normal'>Normal</option>
        </select>

        {/* Pris */}
        <h3>Pris</h3>
        {selectedSize === "Familie" ? (
          <p>{dish?.price?.family} DKK</p>
        ) : selectedSize === "Normal" ? (
          <p>{dish?.price?.normal} DKK</p>
        ) : (
          <p>Vælg en størrelse for at se prisen</p>
        )}

        <Button buttonText={`Bestil ${dish?.title}`} onClick={handleOrder} />
      </section>
    </article>
  );
};

export default DishDetails;
