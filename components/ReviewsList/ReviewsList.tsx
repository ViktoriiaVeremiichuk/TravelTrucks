import { ReviewCard } from '../ReviewCard/ReviewCard';
import styles from '@/components/ReviewsList/ReviewsList.module.css';

interface Review {
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className={styles.reviewsBlock}>
      <ul className={styles.reviewsList}>
        {reviews.map(review => (
          <li key={review.id}>
            <ReviewCard
              reviewer_name={review.reviewer_name}
              reviewer_rating={review.reviewer_rating}
              comment={review.comment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
