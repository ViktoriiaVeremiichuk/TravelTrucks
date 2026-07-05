import Image from 'next/image';
import Link from 'next/link';
import type { Camper } from '@/types/camper';
import styles from './CamperCard.module.css';
import { FaEuroSign, FaStar, FaCarAlt } from 'react-icons/fa';
import { IoMapOutline } from 'react-icons/io5';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { TbManualGearbox } from 'react-icons/tb';

export const CamperCard = ({ data }: { data: Camper }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={data.coverImage} alt={data.name} width={219} height={240} />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.title}>{data.name}</h2>
          <p className={styles.price}>
            <FaEuroSign />
            {data.price}
          </p>
        </div>

        <div className={styles.details}>
          <span>
            <FaStar className={styles.staricon} /> {data.rating} (
            {data.totalReviews} Reviews)
          </span>
          <span>
            <IoMapOutline className={styles.mapicon} /> {data.location}
          </span>
        </div>

        <p className={styles.description}>{data.description}</p>

        <div className={styles.badges}>
          <span className={styles.tags}>
            <BsFillFuelPumpFill />
            {data.engine}
          </span>
          <span className={styles.tags}>
            <TbManualGearbox />
            {data.transmission}
          </span>
          <span className={styles.tags}>
            <FaCarAlt />
            {data.form}
          </span>
        </div>

        <Link href={`/catalog/${data.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </div>
  );
};
