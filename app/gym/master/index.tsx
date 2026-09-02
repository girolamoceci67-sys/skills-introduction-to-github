import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { Redirect, router, useFocusEffect } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '../../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import { listGymMembers, updateGymName } from '../../../src/gym/gymRepository';
import { useGymSession } from '../../../src/gym/gymSession';
import type { GymProfile } from '../../../src/gym/types';
import { colors, radii, shadows, spacing, typography } from '../../../src/theme/theme';

export default function MasterDashboard() {
  const status = useGymSession((state) => state.status);
  const profile = useGymSession((state) => state.profile);
  const gym = useGymSession((state) => state.gym);
  const refresh = useGymSession((state) => state.refresh);
  const signOut = useGymSession((state) => state.signOut);

  const [gymName, setGymName] = useState(gym?.name ?? '');
  const [savingName, setSavingName] = useState(false);
  const [members, setMembers] = useState<GymProfile[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setGymName(gym?.name ?? '');
  }, [gym?.name]);

  const loadMembers = useCallback(() => {
    if (!profile) return;
    setLoadError(false);
    listGymMembers(profile.gymId)
      .then(setMembers)
      .catch(() => setLoadError(true));
  }, [profile]);

  useFocusEffect(
    useCallback(() => {
      loadMembers();
    }, [loadMembers])
  );

  if (status === 'ready' && profile?.role !== 'master') {
    return <Redirect href="/gym/member" />;
  }

  if (!profile || !gym) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  async function handleSaveGymName() {
    if (!gym || !gymName.trim() || gymName.trim() === gym.name) return;
    setSavingName(true);
    try {
      await updateGymName(gym.id, gymName.trim());
      await refresh();
    } finally {
      setSavingName(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Ciao, {profile.displayName}</Text>
      <Text style={styles.subtitle}>Gestisci il nome della tua palestra e i tuoi iscritti.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome palestra</Text>
        <TextInput
          style={styles.input}
          value={gymName}
          onChangeText={setGymName}
          placeholder="Es. Palestra Corpo Libero"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={handleSaveGymName}
        />
        <PrimaryButton
          label={savingName ? 'Salvataggio…' : 'Salva nome'}
          onPress={handleSaveGymName}
          disabled={savingName || !gymName.trim() || gymName.trim() === gym.name}
        />
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Iscritti ({members?.length ?? 0})</Text>
        <AnimatedPressable
          style={styles.smallButton}
          onPress={() => router.push('/gym/master/exercises')}
          accessibilityRole="button"
        >
          <Text style={styles.smallButtonLabel}>Esercizi personalizzati</Text>
        </AnimatedPressable>
      </View>

      <PrimaryButton label="+ Aggiungi iscritto" onPress={() => router.push('/gym/master/new-member')} />

      {loadError && <Text style={styles.error}>Non riesco a caricare gli iscritti. Controlla la connessione.</Text>}

      {members === null && !loadError && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />}

      {members?.length === 0 && (
        <Text style={styles.emptyText}>Nessun iscritto ancora. Aggiungi il primo con il bottone qui sopra.</Text>
      )}

      {members?.map((member, index) => (
        <Animated.View key={member.id} entering={FadeInDown.delay(Math.min(index, 8) * 40)}>
          <AnimatedPressable
            style={styles.memberCard}
            onPress={() => router.push(`/gym/master/member/${member.id}`)}
            accessibilityRole="button"
          >
            <Text style={styles.memberName}>{member.displayName}</Text>
            <Text style={styles.memberHint}>Tocca per impostare il piano →</Text>
          </AnimatedPressable>
        </Animated.View>
      ))}

      <AnimatedPressable style={styles.signOutLink} onPress={() => signOut().then(() => router.replace('/gym/login'))}>
        <Text style={styles.signOutLabel}>Esci</Text>
      </AnimatedPressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  label: { ...typography.caption, color: colors.textMuted },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    backgroundColor: colors.background,
    color: colors.text,
    ...typography.body,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: { ...typography.heading, fontSize: 17, color: colors.text },
  smallButton: {
    backgroundColor: '#EEF5F0',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  smallButtonLabel: { ...typography.caption, color: colors.primaryDark, fontWeight: '700' },
  error: { ...typography.caption, color: colors.danger, marginTop: spacing.sm },
  emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md, textAlign: 'center' },
  memberCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    ...shadows.card,
  },
  memberName: { ...typography.body, fontWeight: '700', color: colors.text },
  memberHint: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  signOutLink: { marginTop: spacing.xl, alignSelf: 'center', marginBottom: spacing.lg },
  signOutLabel: { ...typography.body, color: colors.danger, fontWeight: '600' },
});
