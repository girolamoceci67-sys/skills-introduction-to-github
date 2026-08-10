import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../src/components/Screen';
import { getCurrentUser } from '../../src/data/repositories/userRepository';
import { useRefreshBus } from '../../src/data/refreshBus';
import {
  goalOptions,
  startingLevelOptions,
} from '../../src/features/onboarding/onboardingContent';
import type { UserProfile } from '../../src/domain/exercises/types';
import { colors, radii, spacing, typography } from '../../src/theme/theme';

export default function Home() {
  const version = useRefreshBus((state) => state.version);
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, [version]);

  if (user === undefined) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (user === null) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>Profilo non trovato</Text>
          <Text style={styles.subtitle}>Riavvia l’app per rifare l’onboarding.</Text>
        </View>
      </Screen>
    );
  }

  const levelLabel = startingLevelOptions.find((o) => o.value === user.startingLevel)?.title;
  const goalLabel = goalOptions.find((o) => o.value === user.goal)?.title;

  return (
    <Screen>
      <Text style={styles.title}>Il tuo profilo</Text>
      <View style={styles.card}>
        <Row label="Livello di partenza" value={levelLabel ?? user.startingLevel} />
        <Row label="Obiettivo" value={goalLabel ?? user.goal} />
        <Row label="Giorni a settimana" value={String(user.daysPerWeekAvailable)} />
        <Row
          label="Limitazioni"
          value={user.limitations.length ? user.limitations.join(', ') : 'nessuna'}
        />
      </View>
      <Text style={styles.note}>
        Il piano settimanale generato dal motore adattivo comparirà qui una volta collegata la
        libreria esercizi, prossimo modulo dell’implementazione.
      </Text>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
  subtitle: { ...typography.body, color: colors.textMuted },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { ...typography.body, color: colors.textMuted },
  rowValue: { ...typography.body, color: colors.text, fontWeight: '600' },
  note: { ...typography.caption, color: colors.textMuted, marginTop: spacing.lg },
});
