import styles from "./pageHeader.module.css";
import headerImg from "/headerImg.png";

const PageHeader = ({ title, subTitle }) => {
  return (
    <header
      className={styles.pageHeader}
      style={{
        backgroundImage: `url(${headerImg})`,
      }}>
      <div className={styles.pageHeaderContent}>
        <h1 className={styles.pageTitle}>
          {title}
          {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
        </h1>
      </div>
    </header>
  );
};

export default PageHeader;
