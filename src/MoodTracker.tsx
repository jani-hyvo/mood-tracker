import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState, useCallback } from 'react';
import type { EventInput } from '@fullcalendar/core';
import type { User } from '@supabase/supabase-js';

import { SignOutButton } from './components/Authentication/SignOut';
import { supabase } from './lib/supabaseClient';
import { MOOD_COLORS } from './utils/colors';
import { ThemeToggle } from './components/Theme/ThemeToggle';

interface IMoodTracker {
  user: User;
}

type MoodEntry = {
  date: string;
  mood: number;
  note: string;
};

async function fetchMoods(userId: string): Promise<MoodEntry[]> {
  const { data, error } = await supabase.from('mood_entries').select('date, mood, note').eq('user_id', userId);

  if (error) {
    console.error('Error fetching moods:', error);
    return [];
  }
  return data;
}

export default function MoodTracker({ user }: IMoodTracker) {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);
  const [loading, setLoading] = useState(true);

  const getMoods = useCallback(async () => {
    setLoading(true);
    const fetchedMoods = await fetchMoods(user.id);

    const events = fetchedMoods.map((entry) => ({
      date: entry.date,
      title: entry.note || `Mood: ${entry.mood}`,
      backgroundColor: MOOD_COLORS[entry.mood - 1],
      borderColor: MOOD_COLORS[entry.mood - 1],
      allDay: true,
    }));

    setCalendarEvents(events);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    getMoods();
  }, [getMoods]);

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Mood tracker</h1>
      <p>Hey, {user.email}!</p>
      <SignOutButton />
      <ThemeToggle />
      {loading && calendarEvents.length === 0 ? (
        <p>Loading moods...</p>
      ) : (
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={calendarEvents} />
      )}
    </>
  );
}
