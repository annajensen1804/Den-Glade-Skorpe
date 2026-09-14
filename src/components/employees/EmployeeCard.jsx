import styles from "./employeeCard.module.css";

const EmployeeCard = ({ employee }) => {
  return (
    <figure className={styles.employeeCard}>
      <img src={employee.image} alt={employee.name} />
      <figcaption>
        <h3>{employee.name}</h3>
        <p>{employee.position}</p>
      </figcaption>
    </figure>
  );
};

export default EmployeeCard;
