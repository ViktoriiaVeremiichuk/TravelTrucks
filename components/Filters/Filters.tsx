'use client';
import { useState, useEffect } from 'react';
import styles from './Filters.module.css';
import { IoMapOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import type { FilterState } from '@/types/camper';

export const Filters = ({
  initialFilters,
  onFilterChange,
}: {
  initialFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleClear = () => {
    const emptyFilters = {
      location: '',
      form: '',
      engine: '',
      transmission: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.locationGroup}>
          <label className={styles.locationTitle}>Location</label>

          <div className={styles.inputWrapper}>
            <IoMapOutline className={styles.icon} />
            <input
              className={styles.input}
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Kyiv"
            />
          </div>
        </div>

        <div className={styles.filtersGroup}>
          <h3 className={styles.filtersTitle}>Filters</h3>
          <div className={styles.labelGroup}>
            <label className={styles.sectionTitle}>Camper form</label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="form"
                value="alcove"
                checked={filters.form === 'alcove'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Alcove</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="form"
                value="panel_van"
                checked={filters.form === 'panel_van'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Panel van</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="form"
                value="integrated"
                checked={filters.form === 'integrated'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Integrated</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="form"
                value="semi_integrated"
                checked={filters.form === 'semi_integrated'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Semi Integrated</span>
            </label>
          </div>
          <div className={styles.labelGroup}>
            <label className={styles.sectionTitle}>Engine</label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="engine"
                value="diesel"
                checked={filters.engine === 'diesel'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Diesel</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="engine"
                value="petrol"
                checked={filters.engine === 'petrol'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Petrol</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="engine"
                value="hybrid"
                checked={filters.engine === 'hybrid'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Hybrid</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="engine"
                value="electric"
                checked={filters.engine === 'electric'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Electric</span>
            </label>
          </div>
          <div className={styles.labelGroup}>
            <label className={styles.sectionTitle}>Transmission</label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="transmission"
                value="automatic"
                checked={filters.transmission === 'automatic'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Automatic</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                className={styles.radioInput}
                type="radio"
                name="transmission"
                value="manual"
                checked={filters.transmission === 'manual'}
                onChange={handleChange}
              />
              <span className={styles.radio}></span>
              <span>Manual</span>
            </label>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={handleSearch} className={styles.searchBtn}>
          Search
        </button>
        <button type="button" onClick={handleClear} className={styles.clearBtn}>
          <RxCross2 className={styles.btnicon} />
          Clear filters
        </button>
      </div>
    </div>
  );
};
