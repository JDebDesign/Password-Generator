import { useRef } from 'react';

export default function Controls({ length, useNumbers, useSymbols, onLengthChange, onNumbersChange, onSymbolsChange }) {
  const sliderRef = useRef(null);

  function handleSlider(e) {
    onLengthChange(parseInt(e.target.value, 10));
  }

  function handleInput(e) {
    const val = Math.min(32, Math.max(8, parseInt(e.target.value, 10) || 8));
    onLengthChange(val);
  }

  function handleBlur(e) {
    const val = Math.min(32, Math.max(8, parseInt(e.target.value, 10) || 8));
    onLengthChange(val);
  }

  return (
    <div className="controls">
      <div className="control-row">
        <span className="control-label">Length</span>
        <div className="length-control">
          <input
            type="range"
            ref={sliderRef}
            min="8"
            max="32"
            value={length}
            onChange={handleSlider}
          />
          <input
            type="number"
            className="length-value-input"
            value={length}
            min="8"
            max="32"
            onChange={handleInput}
            onBlur={handleBlur}
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
