import { useLoaderData } from "react-router-dom";
import EmployeeCard from "../components/employees/EmployeeCard";
import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "/headerImg.png";

// useLoaderData() henter det array af medarbejdere, employeesLoader returnerede.
const Employees = () => {
  const employees = useLoaderData();

  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle='SKORPE' headerImg={headerImg} />
      <div className='introText'>
        <h3>Personalet hos Den Glade Skorpe</h3>
        <p>
          Pizzaria Den Glade Skorpe har et dedikeret og venligt personale, der
          altid går den ekstra mil for at sikre, at kunderne får den bedste
          oplevelse. Teamet består af erfarne pizzabagere, der med passion
          tilbereder lækre pizzaer med friske råvarer. Derudover står det
          servicemindede serveringspersonale klar til at byde kunderne velkommen
          og sikre, at deres besøg er hyggeligt og uforglemmeligt.
        </p>
      </div>
      <div className='flexContainer'>
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </article>
  );
};

export default Employees;
