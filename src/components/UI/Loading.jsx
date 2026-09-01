import styles from './UI.module.css';

// Simple loading indicator shown while "fetching" data (simulated with useEffect + setTimeout).
const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.spinner} />
    <p>Loading recipes...</p>
  </div>
);

export default Loading;
