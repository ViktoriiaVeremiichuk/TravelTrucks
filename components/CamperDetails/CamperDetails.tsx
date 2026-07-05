'use client';

import styles from '@/components/CamperDetails/CamperDetails.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Camper } from '@/types/camper';
import { Loader } from '@/components/Loader/Loader';
import { BookForm } from '@/components/BookForm/BookForm';
import { FotoGallery } from '@/components/FotoGallery/FotoGallery';
import { ReviewsList } from '@/components/ReviewsList/ReviewsList';
import { FaEuroSign, FaStar } from 'react-icons/fa';
import { IoMapOutline } from 'react-icons/io5';

export const CamperDetails = ({ data }: { data: Camper }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://campers-api.goit.study/campers/${data.id}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Помилка завантаження відгуків', error);
      }
    };

    fetchReviews();
  }, [data.id]);

  if (!data) {
    return <Loader />;
  }

  const vehicleDetails = [
    { label: 'Form', value: data.form },
    { label: 'Length', value: data.length },
    { label: 'Width', value: data.width },
    { label: 'Height', value: data.height },
    { label: 'Tank', value: data.tank },
    { label: 'Consumption', value: data.consumption },
  ];

  const formatAmenity = (word: string): string => {
    const exceptions = ['ac', 'tv'];
    if (exceptions.includes(word.toLowerCase())) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className="container">
      <div className={styles.topSection}>
        <div className={styles.fotogallery}>
          <FotoGallery gallery={data.gallery} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.headerRating}>
            <h2 className={`${styles.title} ${styles.mb8}`}>{data.name}</h2>
            <div className={`${styles.infoReviews} ${styles.mb16}`}>
              <span>
                <FaStar className={styles.staricon} /> {data.rating} (
                {data.totalReviews} Reviews)
              </span>
              <span>
                <IoMapOutline className={styles.mapicon} /> {data.location}
              </span>
            </div>
            <p className={`${styles.price} ${styles.mb24}`}>
              <FaEuroSign />
              {data.price}
            </p>

            <p className={styles.description}>{data.description}</p>
          </div>
          <div className={styles.details}>
            <h2 className={`${styles.title} ${styles.mb16}`}>
              Vehicle details
            </h2>
            <ul className={styles.amenitiesList}>
              {data.amenities.slice(0, 6).map((amenity, index) => (
                <li key={index} className={styles.amenityItem}>
                  {formatAmenity(amenity)}
                </li>
              ))}
            </ul>
            <ul className={styles.detailsList}>
              {vehicleDetails.map(item => (
                <li key={item.label} className={styles.detailsItem}>
                  <span>{item.label}</span>
                  <span>
                    {typeof item.value === 'string'
                      ? item.value.charAt(0).toUpperCase() + item.value.slice(1)
                      : item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h2 className={`${styles.title} ${styles.mb24}`}>Reviews</h2>

      <div className={styles.reviewSection}>
        <div className={styles.reviews}>
          <ReviewsList reviews={reviews} />
        </div>
        <div>
          <BookForm camperId={data.id} />
        </div>
      </div>
    </div>
  );
};
export default CamperDetails;
