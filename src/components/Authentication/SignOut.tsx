import { LogOut } from 'lucide-react';

import { supabase } from '../../lib/supabaseClient';
import { Button } from '@/components/shadcn/button';

export function SignOutButton() {
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Button variant="outline" onClick={signOut}>
      <LogOut />
      Sign out
    </Button>
  );
}
