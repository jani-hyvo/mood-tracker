import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState, useCallback } from 'react';
import type { EventInput, EventClickArg, EventContentArg, DayCellContentArg } from '@fullcalendar/core';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import fiLocale from '@fullcalendar/core/locales/fi';
import type { User } from '@supabase/supabase-js';
import { X } from 'lucide-react';

import { supabase } from '../../lib/supabaseClient';
import { MOOD_COLORS } from '../../utils/colors';
import { useCalendarPopover, type MoodEntry } from '../../hooks/useCalendarPopover';
import { Popover, PopoverContent, PopoverAnchor } from '../shadcn/popover';
import { Button } from '../shadcn/button';
import { Label } from '../shadcn/label';
import { GoodIcon, LovelyIcon, LowIcon, NeutralIcon, SadIcon } from '../Icons';

const MOOD_ICONS = [LowIcon, SadIcon, NeutralIcon, GoodIcon, LovelyIcon];

interface IMoodTracker {
  user: User;
}

async function fetchMoods(userId: string): Promise<MoodEntry[]> {
  const { data, error } = await supabase.from('mood_entries').select('id, date, mood, note').eq('user_id', userId);

  if (error) {
    console.error('Error fetching moods:', error);
    return [];
  }
  return data;
}

function renderEventContent(eventInfo: EventContentArg) {
  const mood = eventInfo.event.extendedProps.mood;
  const note = eventInfo.event.extendedProps.note;
  const Icon = MOOD_ICONS[mood - 1];
  return (
    <div className="flex flex-col items-center p-1">
      <Icon className="w-10 h-10" />
      {note && <p className="text-xs text-center truncate">{note}</p>}
    </div>
  );
}

export default function MoodTracker({ user }: IMoodTracker) {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    popoverOpen,
    selectedDate,
    note,
    selectedMood,
    popoverAnchorPoint,
    setNote,
    setSelectedMood,
    openPopover,
    closePopover,
    setPopoverOpen,
  } = useCalendarPopover(moodEntries);

  const getMoods = useCallback(async () => {
    setLoading(true);
    const fetchedMoods = await fetchMoods(user.id);
    setMoodEntries(fetchedMoods);

    const events = fetchedMoods.map((entry) => ({
      id: entry.id?.toString(),
      date: entry.date,
      title: entry.note,
      extendedProps: {
        mood: entry.mood,
        note: entry.note,
      },
      backgroundColor: 'transparent',
      borderColor: MOOD_COLORS[entry.mood - 1],
      allDay: true,
    }));

    setCalendarEvents(events);
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    getMoods();
  }, [getMoods]);

  const handleOpenPopover = (arg: DateClickArg | EventClickArg) => {
    const dateStr = 'dateStr' in arg ? arg.dateStr : arg.event.startStr.split('T')[0];
    const dayEl = 'dayEl' in arg ? arg.dayEl : arg.el;
    openPopover(dateStr, dayEl);
  };

  const handleSave = async () => {
    if (!selectedDate || selectedMood === null) return;

    const existingEntry = moodEntries.find((entry) => entry.date === selectedDate);

    const { error } = await supabase.from('mood_entries').upsert({
      id: existingEntry?.id,
      user_id: user.id,
      date: selectedDate,
      mood: selectedMood,
      note: note,
    });

    if (error) {
      console.error('Error saving mood:', error);
    } else {
      closePopover();
      await getMoods();
    }
  };

  const renderDayCellContent = (dayCellContent: DayCellContentArg) => {
    console.log('day cell content : ', dayCellContent);
    return (
      <div>
        <p>test</p>
      </div>
    );
  };

  return (
    <div className="relative">
      {loading && calendarEvents.length === 0 ? (
        <p>Loading moods...</p>
      ) : (
        <>
          <FullCalendar
            dateClick={handleOpenPopover}
            eventClick={handleOpenPopover}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventContent={renderEventContent}
            locales={[fiLocale]}
            timeZone="Europe/Helsinki"
          />

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverAnchor
              style={{
                position: 'absolute',
                top: popoverAnchorPoint.y,
                left: popoverAnchorPoint.x,
              }}
            />
            <PopoverContent side="bottom" align="center" className="w-80">
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="leading-none font-medium">Log your mood</h4>
                  <Button variant="ghost" size="sm" onClick={closePopover}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label>Mood:</Label>
                  <div className="flex gap-2">
                    {MOOD_ICONS.map((Icon, index) => (
                      <Button
                        key={index}
                        variant={selectedMood === index + 1 ? 'default' : 'ghost'}
                        size="icon-lg"
                        style={{
                          backgroundColor: selectedMood === index + 1 ? MOOD_COLORS[index] : undefined,
                          borderColor: selectedMood === index + 1 ? MOOD_COLORS[index] : 'transparent',
                        }}
                        onClick={() => setSelectedMood(index + 1)}
                      >
                        <Icon className="w-10 h-10" />
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes:</Label>
                  <textarea
                    id="notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="How was your day?"
                  />
                </div>
                <Button onClick={handleSave} disabled={selectedMood === null}>
                  Save
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
}
