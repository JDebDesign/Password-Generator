import { useState, useEffect, useRef } from 'react';
import styles from './SaveModal.module.css';

export default function SaveModal({ password, onSave, onClose }) {
  const [label, setLabel] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(password, label.trim() || null);
    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <p className={styles.title}>Save password</p>

        <div className={styles.pw}>{password}</div>

        <form className={styles.fieldGroup} onSubmit={handleSubmit}>
          <label className={styles.label}>Label <span style={{ opacity: 0.5 }}>(optional)</span></label>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="e.g. Gmail, GitHub, Netflix…"
            value={label}
            onChange={e => setLabel(e.target.value)}
            maxLength={80}
          />

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
