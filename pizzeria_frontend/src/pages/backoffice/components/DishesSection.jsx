// TODO (code-along): Vis alle retter i en tabel.
//   - Props fra Backoffice: dishes, onAdd, onEdit.
//   - Kolonner: titel, billede, pris (normal/familie), ingredienser, kategori, handlinger.
//   - "Rediger" → onEdit(dish)   (åbner modal med retten)
//   - "Slet"    → remove("dish", dish._id) fra useCrud
//   - Knap "Tilføj ret" → onAdd()  (åbner tom modal)

import Button from "../../../components/button/Button";

const DishesSection = ({ dishes, onAdd, onEdit, onDelete }) => {
  
  return (
    <section className="table-container">
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Billede</th>
            <th>Pris (normal)</th>
            <th>Pris (familie)</th>
            <th>Ingredienser</th>
            <th>Kategori</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish._id}>
              <td>{dish.title}</td>
              <td>
                <img src={dish.image} alt={dish.title} />
              </td>
              <td>{dish.price?.normal} DKK</td>
              <td>
                {dish.price?.family > 0 ? `${dish.price.family} DKK` : "-"}
              </td>
              <td>
                {dish.ingredients?.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </td>
              <td>{dish.category?.name || dish.category}</td>
              <td>
                <Button
                  buttonText="Rediger"
                  variant="small"
                  onClick={() => onEdit(dish)}
                />
                <Button
                  buttonText="Slet"
                  variant="red"
                  onClick={() => onDelete(dish)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button buttonText="Tilføj ret" onClick={onAdd} />
    </section>
  );
};

export default DishesSection;