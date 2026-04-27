const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS  = '0123456789';
const SPECIAL = '!@#$%^&*<>?';

export function generatePassword(length, useNumbers, useSymbols) {
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

export function copyText(text) {
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
