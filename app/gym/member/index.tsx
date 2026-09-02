import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '../../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import { dumbbellLibrary } from '../../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../../src/domain/exercises/library';
import { listGymExercises, listMemberPlan } from '../../../src/gym/gymRepository';
import { useGymSession } from '../../../src/gym/gymSession';
import type { GymExercise, MemberPlanExercise } from '../../../src/gym/types';
import { colors, radii, shadows, spacing, typography } from '../../../src/theme/theme';

const builtinLibrary = [...exerciseLibrary, ...dumbbellLibrary];
const builtinById = new Map(builtinLibrary.map((e) => [e.id, e]));

function PlanRow({ item, gymExercises, order }: { item: MemberPlanExercise; gymExercises: GymExercise[]; order: number }) {
  const builtinExercise = item.exerciseSource === 'builtin' ? builtinById.get(item.exerciseRef) : null;
  const content = useExerciseContent(builtinExercise?.id ?? '');
  const custom = item.exerciseSource === 'gym_custom' ? gymExercises.find((g) => g.id === item.exerciseRef) : null;
  const name = builtinExercise ? content.name : custom?.name ?? '—';
  const instructions = builtinExercise ? content.instructions.join(' ') : custom?.instructions ?? '';

  return (
    <Animated.View entering={FadeInDown.delay(Math.min(order, 8) * 50)} style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.badge}>{order + 1}</Text>
        <Text style={styles.cardTitle}>{name}</Text>
      </View>
      {instructions ? <Text style={styles.cardBody}>{instructions}</Text> : null}
    </Animated.View>
  );
}

export default function MemberHome() {
  const profile = useGymSession((state) => state.profile);
  const gym = useGymSession((state) => state.gym);
  const signOut = useGymSession((state) => state.signOut);
  const [plan, setPlan] = useState<MemberPlanExercise[] | null>(null);
  const [gymExercises, setGymExercises] = useState<GymExercise[]>([]);

  const load = useCallback(() => {
    if (!profile) return;
    Promise.all([listMemberPlan(profile.id), listGymExercises(profile.gymId)]).then(([p, exercises]) => {
      setPlan(p);
      setGymExercises(exercises);
    });
  }, [profile]);

  useFocusEffect(load);

  if (!profile || !gym) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.gymName}>{gym.name}</Text>
      <Text style={styles.title}>Ciao, {profile.displayName}</Text>
      <Text style={styles.subtitle}>Ecco gli esercizi che il tuo istruttore ha scelto per te.</Text>

      {plan === null && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.lg }} />}

      {plan?.length === 0 && (
        <Text style={styles.emptyText}>Il tuo istruttore non ha ancora assegnato esercizi. Torna più tardi.</Text>
      )}

      {plan && plan.length > 0 && (
        <PrimaryButton label="Inizia l'allenamento" onPress={() => router.push('/gym/session')} />
      )}

      {plan?.map((item, index) => (
        <PlanRow key={item.id} item={item} gymExercises={gymExercises} order={index} />
      ))}

      <AnimatedPressable style={styles.signOutLink} onPress={() => signOut().then(() => router.replace('/gym/login'))}>
        <Text style={styles.signOutLabel}>Esci</Text>
      </AnimatedPressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gymName: { ...typography.caption, color: colors.primary, fontWeight: '700', marginBottom: 2 },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  badge: {
    ...typography.caption,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    overflow: 'hidden',
  },
  cardTitle: { ...typography.body, fontWeight: '700', color: colors.text, flex: 1 },
  cardBody: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
  signOutLink: { marginTop: spacing.xl, alignSelf: 'center', marginBottom: spacing.lg },
  signOutLabel: { ...typography.body, color: colors.danger, fontWeight: '600' },
});
