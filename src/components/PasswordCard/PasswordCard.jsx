import { useState } from 'react';
import Controls from '../Controls/Controls.jsx';
import PasswordBox from '../PasswordBox/PasswordBox.jsx';
import { generatePassword } from '../../utils/password.js';

export default function PasswordCard({ isAuthenticated, onSave }) {
  const [length, setLength] = useState(15);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwords, setPasswords] = useState(['', '']);

  function handleGenerate() {
    setPasswords([
      generatePassword(length, useNumbers, useSymbols),
      generatePassword(length, useNumbers, useSymbols),
    ]);
  }

  return (
    <div className="card">
      <p className="heading">
        Generate a <br />
        <span className="accent">random password</span>
      </p>
      <p className="supporting-text">Never use an insecure password again.</p>

      <Controls
        length={length}
        useNumbers={useNumbers}
        useSymbols={useSymbols}
        onLengthChange={setLength}
        onNumbersChange={setUseNumbers}
        onSymbolsChange={setUseSymbols}
      />

      <button className="btn-generate" onClick={handleGenerate}>
        Generate passwords
      </button>

      <div className="divider" />

      <div className="password-row">
        <PasswordBox
          password={passwords[0]}
          isAuthenticated={isAuthenticated}
          onSave={onSave}
        />
        <PasswordBox
          password={passwords[1]}
          isAuthenticated={isAuthenticated}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
