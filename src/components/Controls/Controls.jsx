import { useState, useEffect } from 'react';

export default function Controls({ length, useNumbers, useSymbols, onLengthChange, onNumbersChange, onSymbolsChange }) {
  // Local display value lets the user type freely; we only validate on blur/Enter.
  const [inputVal, setInputVal] = useState(String(length));

  // Keep display in sync when the slider changes the parent's length.
  useEffect(() => {
    setInputVal(String(length));
  }, [length]);

  function handleSlider(e) {
    onLengthChange(parseInt(e.target.value, 10));
  }

  function commitInput(raw) {
    const parsed = parseInt(raw, 10);
    const clamped = Number.isNaN(parsed) ? 8 : Math.min(32, Math.max(8, parsed));
    setInputVal(String(clamped));
    onLengthChange(clamped);
  }

  function handleInputChange(e) {
    setInputVal(e.target.value); // let the user type freely
  }

  function handleBlur(e) {
    commitInput(e.target.value);
  }

  function handleKeyDown(e) {
    // Block anything that isn't a digit, navigation, or editing key
    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Enter','Home','End'];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') commitInput(e.target.value);
  }

  return (
    <div className="controls">
      <div className="control-row">
        <span className="control-label">Length</span>
        <div className="length-control">
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={handleSlider}
          />
          <input
            type="number"
            className="length-value-input"
            value={inputVal}
            min="8"
            max="32"
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="control-row">
        <span className="control-label">Numbers</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={e => onNumbersChange(e.target.checked)}
          />
          <div className="toggle-track"></div>
          <div className="toggle-thumb"></div>
        </label>
      </div>

      <div className="control-row">
        <span className="control-label">Symbols</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={e => onSymbolsChange(e.target.checked)}
          />
          <div className="toggle-track"></div>
          <div className="toggle-thumb"></div>
        </label>
      </div>
    </div>
  );
}
