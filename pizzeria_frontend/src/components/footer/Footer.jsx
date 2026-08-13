import styles from "./footer.module.css";
import logo from "/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt='logo' />
      <div>
        <p>Email: 2023 Den Glade Skorpe</p>
        <p>Tlf: 12345678</p>
        <p>Adresse:</p>
      </div>
    </footer>
  );
};

export default Footer;
