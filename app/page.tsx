import styles from '../app/page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.text}>
              <h1 className={styles.title}>Campers of your dreams</h1>
              <h2 className={styles.subtitle}>
                You can find everything you want in our catalog
              </h2>
            </div>
            <Link href="/catalog" className={styles.button}>
              View Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
