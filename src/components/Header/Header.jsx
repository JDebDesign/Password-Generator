import styles from './Header.module.css';

export default function Header({ session, onOpenAuth, onSignOut }) {
  if (!session) {
    return (
      <header className={styles.header}>
        <button className={styles.authBtn} onClick={() => onOpenAuth('login')}>
          Log in / Sign up
        </button>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.userRow}>
        <span className={styles.email}>{session.user.email}</span>
        <button className={styles.signOutBtn} onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </header>
  );
}
