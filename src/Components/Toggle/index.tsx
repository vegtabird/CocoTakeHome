import { useState } from 'react';
import styles from './index.module.scss';
function Toggle() {
  const [isOne, setIsOne] = useState(false);
  return (
    <div
      className={`${styles.toggle} ${isOne ? styles.on : ''}`}
      onClick={() => {
        setIsOne(!isOne);
      }}
    >
      <div className={styles.track}></div>
    </div>
  );
}
export { Toggle };
