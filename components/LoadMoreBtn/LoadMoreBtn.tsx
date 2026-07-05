import css from './LoadMoreBtn.module.css';
import { Loader } from '@/components/Loader/Loader';

type Props = {
  onClick: () => void;
  isLoading: boolean;
};

export const LoadMoreBtn = ({ onClick, isLoading }: Props) => {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader /> : 'Load More'}
    </button>
  );
};
