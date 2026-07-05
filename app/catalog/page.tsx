'use client';

import { CamperCard } from '@/components/CamperCard/CamperCard';
import { Filters } from '@/components/Filters/Filters';
import { Loader } from '@/components/Loader/Loader';
import { useState, useEffect, useRef } from 'react';
import { LoadMoreBtn } from '@/components/LoadMoreBtn/LoadMoreBtn';
import { NoCampersFound } from '@/components/NoCampersFound/NoCampersFound';
import type { FilterState, Camper } from '@/types/camper';
import styles from '@/app/catalog/page.module.css';

export default function CatalogPage() {
  const [campers, setCampers] = useState<Camper[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    location: '',
    form: '',
    engine: '',
    transmission: '',
  });
  const firstNewCardRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: '4',
          ...(activeFilters.location && { location: activeFilters.location }),
          ...(activeFilters.form && { form: activeFilters.form }),
          ...(activeFilters.engine && { engine: activeFilters.engine }),
          ...(activeFilters.transmission && {
            transmission: activeFilters.transmission,
          }),
        }).toString();

        const response = await fetch(
          `https://campers-api.goit.study/campers?${query}`
        );

        const { campers, total } = await response.json();
        const allItems = campers || [];

        setCampers(prev => {
          const updatedCampers = page === 1 ? allItems : [...prev, ...allItems];
          setHasMore(updatedCampers.length < total);
          return updatedCampers;
        });
      } catch (error) {
        console.error('Помилка завантаження:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeFilters, page]);

  useEffect(() => {
    if (page > 1 && !isLoading && firstNewCardRef.current) {
      firstNewCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [campers, isLoading, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setPage(1);
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({
      location: '',
      form: '',
      engine: '',
      transmission: '',
    });
    setPage(1);
    setCampers([]);
  };

  return (
    <div className="container">
      <div className={styles.catalogContainer}>
        <Filters
          initialFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {isLoading && campers.length === 0 ? (
          <Loader />
        ) : campers.length > 0 ? (
          <div className={styles.catalogWrapper}>
            <ul className={styles.list}>
              {campers.map((camper, index) => (
                <li
                  className={styles.cardItem}
                  key={camper.id}
                  ref={index === (page - 1) * 5 ? firstNewCardRef : null}
                >
                  <CamperCard data={camper} />
                </li>
              ))}
            </ul>

            {hasMore && (
              <LoadMoreBtn onClick={loadMore} isLoading={isLoading} />
            )}
          </div>
        ) : (
          !isLoading && (
            <NoCampersFound onClear={clearFilters} onViewAll={clearFilters} />
          )
        )}
      </div>
    </div>
  );
}
