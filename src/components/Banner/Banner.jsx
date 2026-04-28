import { useState } from 'react';
import styles from './Banner.module.css';

const DISMISSED_KEY = 'pw_banner_dismissed';

export default function Banner({ onOpenAuth }) {
  const [visible, setVisible] = useState(() => !localStorage.getItem(DISMISSED_KEY));

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <p className={styles.heading}>Stop losing good passwords</p>
      <p className={styles.sub}>
        <button
          onClick={() => onOpenAuth('signup')}
          style={{ background: 'none', border: 'none', color: '#34d399', cursor: 'pointer', font: 'inherit', fontSize: '12px', fontWeight: 500, padding: 0 }}
        >
          Sign up free
        </button>
        {' '}to save and label passwords for every service.
      </p>
      <button className={styles.closeBtn} onClick={dismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}
