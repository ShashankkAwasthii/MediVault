import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { medicineAPI, Medicine } from '../services/api';

// How the notification appears when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const REMINDER_OFFSETS_MIN = [10, 2];

/** Request permission and return whether it was granted */
async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    // Simulators can't receive notifications — skip silently
    return false;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/** Cancel all previously scheduled dose reminders before rescheduling */
async function cancelDoseReminders() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const doseReminders = scheduled.filter(
    (n) => n.content.data?.type === 'dose_reminder'
  );
  await Promise.all(
    doseReminders.map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier))
  );
}

/** Schedule a local notification at a specific Date */
async function scheduleAt(date: Date, title: string, body: string, data: Record<string, unknown>) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,   // uses default system sound
      vibrate: [0, 250, 250, 250],
      data: { ...data, type: 'dose_reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
}

/** Build today's Date for a HH:MM slot string */
function slotToDate(slot: string): Date | null {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const d = new Date();
  d.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return d;
}

export function useDoseNotifications(isLoggedIn: boolean) {
  const scheduledRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Set up Android notification channel
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('dose-reminders', {
        name: 'Dose Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#2196F3',
        sound: 'default',
      });
    }

    const schedule = async () => {
      const granted = await requestPermissions();
      if (!granted) return;

      let medicines: Medicine[];
      try {
        medicines = await medicineAPI.getMedicines();
      } catch {
        return;
      }

      await cancelDoseReminders();

      const now = new Date();

      for (const med of medicines) {
        const slots: string[] = med.timeSlots?.length ? med.timeSlots : ['09:00'];

        for (const slot of slots) {
          const doseTime = slotToDate(slot);
          if (!doseTime) continue;

          for (const offsetMin of REMINDER_OFFSETS_MIN) {
            const fireAt = new Date(doseTime.getTime() - offsetMin * 60 * 1000);
            if (fireAt <= now) continue; // already passed

            const label = offsetMin === 10 ? '10 minutes' : '2 minutes';
            await scheduleAt(
              fireAt,
              '💊 Upcoming Dose',
              `${med.name} (${med.dosage}) is due in ${label}.`,
              {
                medicineId: med._id,
                medicineName: med.name,
                slot,
                minutesBefore: offsetMin,
              }
            );
          }
        }
      }

      scheduledRef.current = true;
    };

    schedule();
  }, [isLoggedIn]);
}
