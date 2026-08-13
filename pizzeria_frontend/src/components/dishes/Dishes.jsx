import { useState } from "react";
import Dish from "./Dish";
import styles from "./dishes.module.css";
import { Link } from "react-router-dom";
import Category from "../category/Category";

// dishes og categories kommer nu som props fra Home (der henter dem via homeLoader).
const Dishes = ({ dishes, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category === selectedCategory)
    : dishes;

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <>
      <div className='introText' style={{ backgroundColor: "#dfd4d1" }}>
        <h3 style={{ color: "white", textShadow: "2px 2px 5px black" }}>
          Vælg kategori
        </h3>
      </div>

      <nav className={styles.categoriesSection}>
        {categories?.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category.name)}
            className={`${styles.category} ${
              selectedCategory === category.name ? styles.active : ""
            }`}>
            <Category category={category} />
          </div>
        ))}
      </nav>

      <header className='introText'>
        {selectedCategory && <h3>Alle vores {selectedCategory}</h3>}
      </header>

      <section className='flexContainer'>
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <Link to={`/dish/${dish._id}`} key={dish._id}>
              <Dish bgImage={dish.image} dish={dish} />
            </Link>
          ))
        ) : (
          <p>Ingen retter fundet.</p>
        )}
      </section>
    </>
  );
};

export default Dishes;
