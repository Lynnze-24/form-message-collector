import React from 'react';
import { motion } from 'framer-motion';
import { usePagination } from '@mantine/hooks';
import styles from './Pagination.module.css';

interface PaginationProps {
  total: number;
  boundaries?: number;
  siblings?: number;
  onChange: (page: number) => void;
  value: number;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  boundaries = 1,
  siblings = 1,
  onChange,
  value,
}) => {
  const { range, first, last, next, previous } = usePagination({
    total,
    page: value,
    onChange,
    boundaries,
    siblings,
  });

  return (
    <div className={styles.pagination}>
      <motion.button
        disabled={value === 1}
        whileTap={{ scale: 0.95 }}
        onClick={first}
        className={styles.Button}
      >
        <span className="material-icons">keyboard_double_arrow_left</span>
      </motion.button>

      <motion.button
        disabled={value === 1}
        whileTap={{ scale: 0.95 }}
        onClick={previous}
        className={styles.Button}
      >
        <span className="material-icons">keyboard_arrow_left</span>
      </motion.button>

      {range.map((p, index) =>
        p === 'dots' ? (
          <motion.p
            key={index + 'page'}
            whileTap={{ scale: 0.95 }}
            className={styles.dots}
          >
            ...
          </motion.p>
        ) : (
          <motion.button
            key={index + 'page'}
            whileTap={{ scale: 0.95 }}
            className={`${styles.Button} ${p === value ? styles.active : ''}`}
            onClick={() => onChange(p as number)}
          >
            {p}
          </motion.button>
        )
      )}

      <motion.button
        disabled={value === total}
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className={styles.Button}
      >
        <span className="material-icons">keyboard_arrow_right</span>
      </motion.button>

      <motion.button
        disabled={value === total}
        whileTap={{ scale: 0.95 }}
        onClick={last}
        className={styles.Button}
      >
        <span className="material-icons">keyboard_double_arrow_right</span>
      </motion.button>
    </div>
  );
};

export default Pagination;
