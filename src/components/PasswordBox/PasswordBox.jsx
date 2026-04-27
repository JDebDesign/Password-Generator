import { useState } from 'react';
import { copyText } from '../../utils/password.js';
import SaveModal from '../SaveModal/SaveModal.jsx';

export default function PasswordBox({ password, isAuthenticated, onSave }) {
  const [copied, setCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  function handleClick() {
    if (!password) return;
    copyText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  function handleSaveClick(e) {
    e.stopPropagation();
    if (!password) return;
    setShowSaveModal(true);
  }

  function handleSave(password, label) {
    onSave(password, label);
  }

  const boxClass = [
    'password-box',
    password ? 'has-password' : '',
    copied ? 'copied' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={boxClass} onClick={handleClick}>
        <span className="password-text">{password}</span>
        <div className="copy-flash"><span>✓ Copied</span></div>
        {isAuthenticated && password && (
          <button
            className="save-btn"
            onClick={handleSaveClick}
            aria-label="Save password"
            title="Save to passbook"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          </button>
        )}
      </div>

      {showSaveModal && (
        <SaveModal
          password={password}
          onSave={handleSave}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </>
  );
}
