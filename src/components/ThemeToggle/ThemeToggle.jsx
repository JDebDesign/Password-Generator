export default function ThemeToggle({ onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle colour theme">
      <svg className="icon-sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-13a1 1 0 0 0 1-1V2a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1Zm0 16a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm9-9h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2ZM4 12a1 1 0 0 0-1-1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm14.95-6.364-.707-.707a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414ZM6.757 17.657l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0-1.414-1.414Zm12.02 1.414-.707-.707a1 1 0 0 0-1.414 1.414l.707.707a1 1 0 0 0 1.414-1.414ZM6.757 6.343 6.05 5.636A1 1 0 0 0 4.636 7.05l.707.707a1 1 0 0 0 1.414-1.414Z"/>
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.53 15.57a9.004 9.004 0 0 1-9.1-9.1 9.003 9.003 0 0 1 1.06-4.18 1 1 0 0 0-1.27-1.37A10 10 0 1 0 20.1 18.74a1 1 0 0 0 1.43-1.17Z"/>
      </svg>
    </button>
  );
}
