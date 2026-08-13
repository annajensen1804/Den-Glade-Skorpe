import MessageForm from "../components/forms/MessageForm";
import PageHeader from "../components/pageHeader/PageHeader";
import headerImg from "/headerImg.png";

const Contact = () => {
  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle='SKORPE' headerImg={headerImg} />
      <div className='introText'>
        <h3>Har du spørgsmål eller ønsker du at bestille din favoritpizza?</h3>
        <p className='introText'>
          Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi
          glæder os til at høre fra dig!
        </p>
      </div>
      <MessageForm />
    </article>
  );
};

export default Contact;
