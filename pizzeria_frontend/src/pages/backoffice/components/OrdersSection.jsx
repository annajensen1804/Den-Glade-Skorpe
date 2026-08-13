// TODO (code-along): Vis alle ordrer i en tabel.
//   - Props fra Backoffice: orders, dishes, onEdit.
//   - Hver ordre kan have flere retter (order.dishes) — list dem op.
//     Find rettens titel med dishes.find((d) => d._id === item.dish).
//   - Kolonner: ordre-id, retter, kommentarer, status, total pris, handlinger.
//   - "Rediger" → onEdit(order)   (åbner modal med ordren)
//   - "Slet"    → remove("order", order._id) fra useCrud

import Button from "../../../components/button/Button";

const OrdersSection = ({ orders, dishes, onEdit, onDelete }) => {

  return (
    <section className="table-container">
      <h2>Ordrer</h2>
      <table>
        <thead>
          <tr>
            <th>Ordre-id</th>
            <th>Retter</th>
            <th>Kommentarer</th>
            <th>Status</th>
            <th>Total pris</th>
            <th>Handlinger</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>
                <ul>
                  {order.dishes?.map((item, index) => {
                    const dish = dishes?.find((d) => d._id === item.dish);
                    return dish ? (
                      <li key={index}>
                        {dish.title} {item.amount ? `(x${item.amount})` : ""}
                      </li>
                    ) : null;
                  })}
                </ul>
              </td>

              <td>{order.comments || "-"}</td>

              <td>{order.status}</td>

              <td>{order.totalPrice || order.price} DKK</td>
              
              <td>
                <Button
                  buttonText="Rediger"
                  variant="small"
                  onClick={() => onEdit(order)}
                />
                <Button
                  buttonText="Slet"
                  variant="red"
                  onClick={() => onDelete(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrdersSection;
