import { useState } from 'react';
import { copyText } from '../../utils/password.js';

export default function PasswordBox({ password, isAuthenticated, onSave }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleClick() {
    if (!password) return;
    copyText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function handleSave(e) {
    e.stopPropagation();
    if (!password) return;
    onSave(password);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  const boxClass = [
    'password-box',
    password ? 'has-password' : '',
    copied ? 'copied' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={boxClass} onClick={handleClick}>
      <span className="password-text">{password}</span>
      <div className="copy-flash"><span>✓ Copied</span></div>
      {isAuthenticated && password && (
        <button
          className="save-btn"
          onClick={handleSave}
          aria-label="Save password"
          title={saved ? 'Saved!' : 'Save to passbook'}
        >
          {saved ? '✓' : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
