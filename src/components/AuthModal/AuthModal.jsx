import { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import styles from './AuthModal.module.css';

export default function AuthModal({ defaultTab = 'login', onClose }) {
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'login' ? styles.active : ''}`}
            onClick={() => setTab('login')}
          >
            Log in
          </button>
          <button
            className={`${styles.tab} ${tab === 'signup' ? styles.active : ''}`}
            onClick={() => setTab('signup')}
          >
            Sign up
          </button>
        </div>

        {tab === 'login'
          ? <LoginForm onSuccess={onClose} />
          : <SignupForm onSuccess={onClose} />
        }
      </div>
    </div>
  );
}
