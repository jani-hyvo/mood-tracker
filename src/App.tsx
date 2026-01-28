import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { supabase } from './lib/supabaseClient';
import Auth from './components/Authentication/Auth';
import MoodTracker from './components/Calendar/MoodTracker';
import { ThemeProvider } from './components/Theme/theme-provider';
import Header from './components/Header/Header';

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col gap-4">
        <Header isSignedIn={session !== null} />
        {!session ? <Auth /> : <MoodTracker user={session.user} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
