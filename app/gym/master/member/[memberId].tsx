import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { AnimatedPressable } from '../../../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../../../src/components/PrimaryButton';
import { Screen } from '../../../../src/components/Screen';
import { dumbbellLibrary } from '../../../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../../../src/domain/exercises/library';
import { listGymExercises, listMemberPlan, setMemberPlan } from '../../../../src/gym/gymRepository';
import { useGymSession } from '../../../../src/gym/gymSession';
import type { ExerciseSource, GymExercise } from '../../../../src/gym/types';
import { colors, radii, shadows, spacing, typography } from '../../../../src/theme/theme';

const builtinLibrary = [...exerciseLibrary, ...dumbbellLibrary];

interface SelectionItem {
  source: ExerciseSource;
  ref: string;
}

function key(item: SelectionItem) {
  return `${item.source}:${item.ref}`;
}

function BuiltinRow({
  exerciseId,
  selected,
  order,
  onToggle,
}: {
  exerciseId: string;
  selected: boolean;
  order: number | null;
  onToggle: () => void;
}) {
  const content = useExerciseContent(exerciseId);
  return (
    <AnimatedPressable style={[styles.row, selected && styles.rowSelected]} onPress={onToggle} scaleTo={0.98}>
      <Text style={styles.rowTitle}>{content.name}</Text>
      {selected && <Text style={styles.rowBadge}>{order! + 1}</Text>}
    </AnimatedPressable>
  );
}

function CustomRow({
  exercise,
  selected,
  order,
  onToggle,
}: {
  exercise: GymExercise;
  selected: boolean;
  order: number | null;
  onToggle: () => void;
}) {
  return (
    <AnimatedPressable style={[styles.row, selected && styles.rowSelected]} onPress={onToggle} scaleTo={0.98}>
      <Text style={styles.rowTitle}>{exercise.name}</Text>
      {selected && <Text style={styles.rowBadge}>{order! + 1}</Text>}
    </AnimatedPressable>
  );
}

export default function MemberPlanEditor() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  const profile = useGymSession((state) => state.profile);
  const [selection, setSelection] = useState<SelectionItem[] | null>(null);
  const [gymExercises, setGymExercises] = useState<GymExercise[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(() => {
    if (!profile || !memberId) return;
    Promise.all([listMemberPlan(memberId), listGymExercises(profile.gymId)]).then(([plan, exercises]) => {
      setSelection(plan.map((p) => ({ source: p.exerciseSource, ref: p.exerciseRef })));
      setGymExercises(exercises);
    });
  }, [profile, memberId]);

  useFocusEffect(load);

  useEffect(() => {
    setSaved(false);
  }, [selection]);

  function toggle(item: SelectionItem) {
    setSelection((current) => {
      if (!current) return current;
      const exists = current.some((c) => key(c) === key(item));
      return exists ? current.filter((c) => key(c) !== key(item)) : [...current, item];
    });
  }

  function orderOf(item: SelectionItem): number | null {
    if (!selection) return null;
    const index = selection.findIndex((c) => key(c) === key(item));
    return index === -1 ? null : index;
  }

  function isSelected(item: SelectionItem): boolean {
    return orderOf(item) !== null;
  }

  async function handleSave() {
    if (!profile || !memberId || !selection) return;
    setSaving(true);
    try {
      await setMemberPlan(profile.gymId, memberId, selection);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (!profile || !selection) {
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
      <Text style={styles.title}>Scegli gli esercizi</Text>
      <Text style={styles.subtitle}>
        Tocca per aggiungere/rimuovere. Il numero mostra l'ordine nel piano — {selection.length} selezionati.
      </Text>

      <PrimaryButton
        label={saving ? 'Salvataggio…' : saved ? 'Salvato ✓' : 'Salva piano'}
        onPress={handleSave}
        disabled={saving}
      />

      {gymExercises.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Esercizi personalizzati della palestra</Text>
          {gymExercises.map((exercise) => {
            const item: SelectionItem = { source: 'gym_custom', ref: exercise.id };
            return (
              <CustomRow
                key={exercise.id}
                exercise={exercise}
                selected={isSelected(item)}
                order={orderOf(item)}
                onToggle={() => toggle(item)}
              />
            );
          })}
        </>
      )}

      <Text style={styles.sectionTitle}>Libreria dell'app</Text>
      {builtinLibrary.map((exercise) => {
        const item: SelectionItem = { source: 'builtin', ref: exercise.id };
        return (
          <BuiltinRow
            key={exercise.id}
            exerciseId={exercise.id}
            selected={isSelected(item)}
            order={orderOf(item)}
            onToggle={() => toggle(item)}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md },
  sectionTitle: { ...typography.heading, fontSize: 17, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
    ...shadows.card,
  },
  rowSelected: { borderColor: colors.primary, backgroundColor: '#EEF5F0' },
  rowTitle: { ...typography.body, color: colors.text, flex: 1 },
  rowBadge: {
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
});
