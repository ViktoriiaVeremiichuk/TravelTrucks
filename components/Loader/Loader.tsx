import styles from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Circles
          height="72"
          width="72"
          color="var(--green-hover)"
          ariaLabel="circles-loading"
          visible={true}
        />
        <h2 className={styles.title}>Loading tracks...</h2>
        <p className={styles.text}>
          Please wait while we fetch the best travel trucks for you
        </p>
      </div>
    </div>
  );
};
