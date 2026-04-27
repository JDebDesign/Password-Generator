import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase.js';

export function usePassbook(session) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = useCallback(async () => {
    if (!session || !supabaseConfigured) { setEntries([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from('passbook')
      .select('*')
      .order('created_at', { ascending: false });
    setEntries(data || []);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    if (!session || !supabaseConfigured) return;

    const channel = supabase
      .channel('passbook-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'passbook', filter: `user_id=eq.${session.user.id}` },
        () => fetchEntries()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [session, fetchEntries]);

  async function savePassword(password, label = null) {
    if (!session || !supabaseConfigured) return;
    await supabase.from('passbook').insert({ password, label, user_id: session.user.id });
  }

  async function deleteEntry(id) {
    if (!supabaseConfigured) return;
    await supabase.from('passbook').delete().eq('id', id);
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  return { entries, loading, savePassword, deleteEntry };
}
