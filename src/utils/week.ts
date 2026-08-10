import { format, startOfWeek } from 'date-fns';

const WEEK_START_FORMAT = 'yyyy-MM-dd';

/** Lunedì della settimana corrente, come chiave stabile per piano/obiettivo settimanale. */
export function currentWeekStartDate(reference: Date = new Date()): string {
  return format(startOfWeek(reference, { weekStartsOn: 1 }), WEEK_START_FORMAT);
}

const WEEKDAY_LABELS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export function weekdayLabel(dayIndex: number): string {
  return WEEKDAY_LABELS[dayIndex] ?? `Giorno ${dayIndex + 1}`;
}
