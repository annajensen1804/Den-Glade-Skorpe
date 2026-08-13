// TODO (code-along): Vis alt personale i en tabel.
//   - Props fra Backoffice: employees, onAdd, onEdit.
//   - Kolonner: navn, billede, position, handlinger.
//   - "Rediger" → onEdit(employee)   (åbner modal med medarbejderen)
//   - "Slet"    → remove("employee", employee._id) fra useCrud
//   - Knap "Tilføj medarbejder" → onAdd()

import Button from "../../../components/button/Button";

const EmployeesSection = ({ employees, onAdd, onEdit, onDelete }) => {

  return (
    <section className="table-container">
      {/*  <Button buttonText="Tilføj ret" onClick={onAdd} /> */}
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Billede</th>
            <th>Position</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>
                <img src={employee.image} alt={employee.name} />
              </td>
              <td>{employee.position}</td>
              <td>
                {employee.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </td>
              <td>
                <Button
                  buttonText="Rediger"
                  variant="small"
                  onClick={() => onEdit(employee)}
                />
                <Button
                  buttonText="Slet"
                  variant="red"
                  onClick={() => onDelete(employee)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button buttonText="Tilføj medarbejder" onClick={onAdd} />
    </section>
  );
};
export default EmployeesSection;
