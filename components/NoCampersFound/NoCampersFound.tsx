import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import styles from '@/components/NoCampersFound/NoCampersFound.module.css';

interface NoCampersFoundProps {
  onClear: () => void;
  onViewAll: () => void;
}

export const NoCampersFound = ({ onClear, onViewAll }: NoCampersFoundProps) => {
  return (
    <div className={styles.overlay}>
      <Image
        className={styles.image}
        src="/nocamperimg.png"
        alt="No campers found"
        width={488}
        height={463}
        priority
      />
      <h2 className={styles.title}>No campers found</h2>
      <p className={styles.info}>
        We couldn`t find any campers that match your filters. <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.buttons}>
        <button className={styles.clearbtn} onClick={onClear}>
          <RxCross2 className={styles.icon} />
          Clear filters
        </button>

        <button className={styles.campersbtn} onClick={onViewAll}>
          View all campers
        </button>
      </div>
    </div>
  );
};
