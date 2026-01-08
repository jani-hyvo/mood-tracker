import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { supabase } from './lib/supabaseClient';
import Auth from './components/Authentication/Auth';
import MoodTracker from './MoodTracker';
import { ThemeProvider } from './components/Theme/theme-provider';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log('session : ', session);
  }, [session]);

  if (!session) {
    return <Auth />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!session ? <Auth /> : <MoodTracker user={session.user} />}
    </ThemeProvider>
  );
}

export default App;
