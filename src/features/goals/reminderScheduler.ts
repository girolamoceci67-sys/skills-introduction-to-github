import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import i18n from '../../i18n';

const REMINDER_NOTIFICATION_ID = 'daily-training-reminder';
const ANDROID_CHANNEL_ID = 'training-reminders';

export type ReminderSyncResult = { ok: true } | { ok: false; reason: 'permission_denied' };

/**
 * Allinea il promemoria giornaliero locale allo stato richiesto. Usa un identificatore fisso
 * così una nuova chiamata sostituisce quella precedente invece di accumulare notifiche duplicate.
 */
export async function syncDailyReminder(
  enabled: boolean,
  timeOfDay: string | null
): Promise<ReminderSyncResult> {
  if (!enabled || !timeOfDay) {
    await Notifications.cancelScheduledNotificationAsync(REMINDER_NOTIFICATION_ID).catch(() => {});
    return { ok: true };
  }

  const permission = await Notifications.requestPermissionsAsync();
  if (permission.status !== 'granted') {
    return { ok: false, reason: 'permission_denied' };
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: i18n.t('notifications.reminderChannelName'),
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const [hour, minute] = timeOfDay.split(':').map(Number);

  await Notifications.cancelScheduledNotificationAsync(REMINDER_NOTIFICATION_ID).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_NOTIFICATION_ID,
    content: {
      title: i18n.t('notifications.reminderTitle'),
      body: i18n.t('notifications.reminderBody'),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: Platform.OS === 'android' ? ANDROID_CHANNEL_ID : undefined,
    },
  });

  return { ok: true };
}
