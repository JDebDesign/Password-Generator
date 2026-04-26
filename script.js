const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS  = '0123456789';
const SPECIAL = '!@#$%^&*<>?';

function generatePassword(length, useNumbers, useSymbols) {
  const pool = UPPER + LOWER + (useNumbers ? DIGITS : '') + (useSymbols ? SPECIAL : '');
  if (!pool) return '';
  const required = [
    UPPER[Math.floor(Math.random() * UPPER.length)],
    LOWER[Math.floor(Math.random() * LOWER.length)],
    ...(useNumbers ? [DIGITS[Math.floor(Math.random() * DIGITS.length)]] : []),
    ...(useSymbols ? [SPECIAL[Math.floor(Math.random() * SPECIAL.length)]] : []),
  ];
  const fill = Array.from(
    { length: Math.max(0, length - required.length) },
    () => pool[Math.floor(Math.random() * pool.length)]
  );
  return [...required, ...fill].sort(() => Math.random() - 0.5).join('');
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
  return Promise.resolve();
}

function flashCopied(box) {
  box.classList.add('copied');
  setTimeout(() => box.classList.remove('copied'), 1200);
}

function getOptions() {
  return {
    length:     parseInt(document.getElementById('lengthSlider').value, 10),
    useNumbers: document.getElementById('toggleNumbers').checked,
    useSymbols: document.getElementById('toggleSymbols').checked,
  };
}

// Length controls
const slider = document.getElementById('lengthSlider');
const lengthInput = document.getElementById('lengthValue');

slider.addEventListener('input', () => { lengthInput.value = slider.value; });

lengthInput.addEventListener('input', () => {
  const val = Math.min(32, Math.max(8, parseInt(lengthInput.value, 10) || 8));
  slider.value = val;
});

lengthInput.addEventListener('blur', () => {
  const val = Math.min(32, Math.max(8, parseInt(lengthInput.value, 10) || 8));
  lengthInput.value = val;
  slider.value = val;
});

// Generate
document.getElementById('btnGenerate').addEventListener('click', () => {
  const { length, useNumbers, useSymbols } = getOptions();
  document.getElementById('pw1').textContent = generatePassword(length, useNumbers, useSymbols);
  document.getElementById('pw2').textContent = generatePassword(length, useNumbers, useSymbols);
  document.getElementById('box1').classList.add('has-password');
  document.getElementById('box2').classList.add('has-password');
});

// Copy on click
['box1', 'box2'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    const text = document.getElementById(id === 'box1' ? 'pw1' : 'pw2').textContent;
    if (!text) return;
    copyText(text).then(() => flashCopied(document.getElementById(id)));
  });
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});
