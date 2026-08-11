import { format, startOfWeek } from 'date-fns';

const WEEK_START_FORMAT = 'yyyy-MM-dd';

/** Lunedì della settimana corrente, come chiave stabile per piano/obiettivo settimanale. */
export function currentWeekStartDate(reference: Date = new Date()): string {
  return format(startOfWeek(reference, { weekStartsOn: 1 }), WEEK_START_FORMAT);
}
