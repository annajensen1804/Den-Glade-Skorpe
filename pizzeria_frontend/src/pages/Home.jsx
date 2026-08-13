import { useLoaderData } from "react-router-dom";
import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "/headerImg.png";
import Dishes from "../components/dishes/Dishes";

// useLoaderData() henter det, homeLoader returnerede: { dishes, categories }.
const Home = () => {
  const { dishes, categories } = useLoaderData();

  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle='SKORPE' headerImg={headerImg} />
      <div className='introText'>
        <h3>Velkommen til Den Glade Skorpe!</h3>
        <p className='introText'>
          Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi
          bruger kun de bedste råvarer til både klassiske favoritter og
          spændende specialiteter som &#34;Parma Drama&#34; og &rdquo;Rabbit
          Royale&rdquo;. Uanset om du er til en lille, personlig pizza eller en
          stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza
          lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!
        </p>
      </div>
      <Dishes dishes={dishes} categories={categories} />
    </article>
  );
};

export default Home;
