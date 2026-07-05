'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';

export const Header = () => {
  const pathname = usePathname();
  const isHomeActive = pathname === '/';
  const isCatalogActive = pathname.startsWith('/catalog');

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/catalog') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" onClick={handleLogoClick}>
          <Image src="/logo.svg" alt="TravelTrucks" width={136} height={16} />
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={isHomeActive ? styles.active : styles.link}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={isCatalogActive ? styles.active : styles.link}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};
