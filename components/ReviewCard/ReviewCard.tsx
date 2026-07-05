import { FaStar } from 'react-icons/fa';
import styles from '@/components/ReviewCard/ReviewCard.module.css';

interface ReviewCardProps {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export const ReviewCard = ({
  reviewer_name,
  reviewer_rating,
  comment,
}: ReviewCardProps) => {
  const renderStars = (reviewer_rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < reviewer_rating ? 'var(--rating)' : 'var(--gray-light)',
        }}
      >
        <FaStar />
      </span>
    ));
  };

  return (
    <div className={styles.reviewCard}>
      <div>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{reviewer_name[0].toUpperCase()}</div>
          <div className={styles.rate}>
            <h3 className={styles.reviewerName}>{reviewer_name}</h3>
            <div>{renderStars(reviewer_rating)}</div>
          </div>
        </div>
      </div>
      <p className={styles.commentText}>{comment}</p>
    </div>
  );
};
