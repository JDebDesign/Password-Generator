import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { usePassbook } from './hooks/usePassbook.js';
import Header from './components/Header/Header.jsx';
import PasswordCard from './components/PasswordCard/PasswordCard.jsx';
import Passbook from './components/Passbook/Passbook.jsx';
import AuthModal from './components/AuthModal/AuthModal.jsx';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.jsx';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'signup'

  const { session, loading: authLoading, signOut } = useAuth();
  const { entries, loading: passbookLoading, savePassword, deleteEntry } = usePassbook(session);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close modal when user signs in
  useEffect(() => {
    if (session) setAuthModal(null);
  }, [session]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  if (authLoading) return null;

  return (
    <>
      <Header
        session={session}
        onOpenAuth={tab => setAuthModal(tab)}
        onSignOut={signOut}
      />

      <PasswordCard
        isAuthenticated={!!session}
        onSave={savePassword}
      />

      {session && (
        <Passbook
          entries={entries}
          loading={passbookLoading}
          onDelete={deleteEntry}
        />
      )}

      {authModal && (
        <AuthModal
          defaultTab={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}

      <ThemeToggle onToggle={toggleTheme} />
    </>
  );
}
