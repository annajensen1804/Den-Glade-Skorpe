import { PulseLoader } from "react-spinners";
import styles from "./loading.module.css";

// Vises som 'hydrateFallbackElement', mens vores loaders henter data.
const Loading = () => {
  return (
    <div className={styles.loading}>
      <PulseLoader color='#4a4a4a' />
    </div>
  );
};

export default Loading;
