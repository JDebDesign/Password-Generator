import PassbookEntry from './PassbookEntry.jsx';
import styles from './Passbook.module.css';

export default function Passbook({ entries, loading, onDelete }) {
  return (
    <section className={styles.section}>
      <p className={styles.heading}>Saved passwords</p>
      <div className={styles.list}>
        {loading && <p className={styles.empty}>Loading…</p>}
        {!loading && entries.length === 0 && (
          <p className={styles.empty}>No saved passwords yet. Generate one and hit save.</p>
        )}
        {entries.map(entry => (
          <PassbookEntry key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
