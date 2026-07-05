'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import styles from './FotoGallery.module.css';
import type { CamperImage } from '@/types/camper';

interface FotoGalleryProps {
  gallery: CamperImage[];
}

export const FotoGallery = ({ gallery }: FotoGalleryProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.galleryContainer}>
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        className={styles.mainSwiper}
      >
        {gallery.map(image => (
          <SwiperSlide key={image.id}>
            <Image
              src={image.original}
              alt=""
              width={638}
              height={505}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.thumbs}>
        {gallery.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`${styles.thumb} ${
              activeIndex === index ? styles.active : ''
            }`}
            onClick={() => {
              swiperRef.current?.slideTo(index);
              setActiveIndex(index);
            }}
          >
            <Image src={image.thumb} alt="" width={135} height={144} />
          </button>
        ))}
      </div>
    </div>
  );
};
