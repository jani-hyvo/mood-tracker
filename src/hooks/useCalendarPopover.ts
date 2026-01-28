import { useState } from 'react';

export type MoodEntry = {
  id?: number;
  date: string;
  mood: number;
  note: string;
  user_id?: string;
};

export function useCalendarPopover(moodEntries: MoodEntry[]) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [popoverAnchorPoint, setPopoverAnchorPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const openPopover = (dateStr: string, dayEl: HTMLElement) => {
    const rect = dayEl.getBoundingClientRect();
    setPopoverAnchorPoint({
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.bottom + window.scrollY,
    });

    const existingEntry = moodEntries.find((entry) => entry.date === dateStr);
    setSelectedDate(dateStr);
    setNote(existingEntry?.note || '');
    setSelectedMood(existingEntry?.mood || null);
    setPopoverOpen(true);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  return {
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
  };
}
