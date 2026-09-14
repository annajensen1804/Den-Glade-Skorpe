import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "/headerImg.png";

const NotFound = () => {
  return (
    <article>
      <PageHeader
        title='404'
        subTitle='Siden blev ikke fundet'
        headerImg={headerImg}
      />
    </article>
  );
};

export default NotFound;
