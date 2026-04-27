import { useState } from 'react';
import { copyText } from '../../utils/password.js';
import styles from './Passbook.module.css';

function masked(pw) {
  return pw.slice(0, 4) + '••••••••';
}

export default function PassbookEntry({ entry, onDelete }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    copyText(entry.password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div className={styles.entry}>
      <div className={styles.entryText}>
        {entry.label && <div className={styles.entryLabel}>{entry.label}</div>}
        <div className={styles.entryPw}>{masked(entry.password)}</div>
      </div>

      <button
        className={styles.iconBtn}
        onClick={handleCopy}
        aria-label="Copy password"
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        )}
      </button>

      <button
        className={`${styles.iconBtn} ${styles.deleteBtn}`}
        onClick={() => onDelete(entry.id)}
        aria-label="Delete entry"
        title="Delete"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
}
