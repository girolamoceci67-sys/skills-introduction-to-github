import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { AnimatedPressable } from '../../../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../../../src/components/PrimaryButton';
import { Screen } from '../../../../src/components/Screen';
import { Stepper } from '../../../../src/components/Stepper';
import { dumbbellLibrary } from '../../../../src/domain/exercises/dumbbellLibrary';
import { useExerciseContent } from '../../../../src/domain/exercises/exerciseContent';
import { exerciseLibrary } from '../../../../src/domain/exercises/library';
import type { MovementType } from '../../../../src/domain/exercises/types';
import { listGymExercises, listMemberPlan, setMemberPlan, type MemberPlanItemInput } from '../../../../src/gym/gymRepository';
import { useGymSession } from '../../../../src/gym/gymSession';
import type { ExerciseSource, GymExercise, TargetUnit } from '../../../../src/gym/types';
import { colors, radii, shadows, spacing, typography } from '../../../../src/theme/theme';

const builtinLibrary = [...exerciseLibrary, ...dumbbellLibrary];
const builtinMovementById = new Map(builtinLibrary.map((e) => [e.id, e.movementType]));

function key(source: ExerciseSource, ref: string) {
  return `${source}:${ref}`;
}

function defaultVolumeFor(movementType: MovementType): Omit<MemberPlanItemInput, 'source' | 'ref'> {
  const isHold = movementType === 'hold';
  return {
    sets: 2,
    target: isHold ? 27 : 9,
    targetUnit: isHold ? 'seconds' : 'reps',
    restSeconds: 60,
  };
}

function PlanRowControls({
  item,
  order,
  onUpdate,
}: {
  item: MemberPlanItemInput;
  order: number;
  onUpdate: (patch: Partial<MemberPlanItemInput>) => void;
}) {
  return (
    <View style={styles.controls}>
      <Text style={styles.controlsHint}>Esercizio #{order + 1} del piano</Text>
      <View style={styles.stepperRow}>
        <Stepper label="Serie" value={item.sets} onChange={(v) => onUpdate({ sets: v })} min={1} max={10} />
        <Stepper
          label={item.targetUnit === 'seconds' ? 'Secondi' : 'Ripetizioni'}
          value={item.target}
          onChange={(v) => onUpdate({ target: v })}
          min={1}
          max={item.targetUnit === 'seconds' ? 180 : 50}
          step={item.targetUnit === 'seconds' ? 5 : 1}
        />
        <Stepper
          label="Riposo (s)"
          value={item.restSeconds}
          onChange={(v) => onUpdate({ restSeconds: v })}
          min={0}
          max={180}
          step={5}
        />
      </View>
    </View>
  );
}

function BuiltinRow({
  exerciseId,
  item,
  order,
  onToggle,
  onUpdate,
}: {
  exerciseId: string;
  item: MemberPlanItemInput | null;
  order: number;
  onToggle: () => void;
  onUpdate: (patch: Partial<MemberPlanItemInput>) => void;
}) {
  const content = useExerciseContent(exerciseId);
  return (
    <View style={[styles.row, item && styles.rowSelected]}>
      <AnimatedPressable style={styles.rowHeader} onPress={onToggle} scaleTo={0.98}>
        <Text style={styles.rowTitle}>{content.name}</Text>
        {item && <Text style={styles.rowBadge}>{order + 1}</Text>}
      </AnimatedPressable>
      {item && <PlanRowControls item={item} order={order} onUpdate={onUpdate} />}
    </View>
  );
}

function CustomRow({
  exercise,
  item,
  order,
  onToggle,
  onUpdate,
}: {
  exercise: GymExercise;
  item: MemberPlanItemInput | null;
  order: number;
  onToggle: () => void;
  onUpdate: (patch: Partial<MemberPlanItemInput>) => void;
}) {
  return (
    <View style={[styles.row, item && styles.rowSelected]}>
      <AnimatedPressable style={styles.rowHeader} onPress={onToggle} scaleTo={0.98}>
        <Text style={styles.rowTitle}>{exercise.name}</Text>
        {item && <Text style={styles.rowBadge}>{order + 1}</Text>}
      </AnimatedPressable>
      {item && <PlanRowControls item={item} order={order} onUpdate={onUpdate} />}
    </View>
  );
}

export default function MemberPlanEditor() {
  const { memberId } = useLocalSearchParams<{ memberId: string }>();
  const profile = useGymSession((state) => state.profile);
  const [selection, setSelection] = useState<MemberPlanItemInput[] | null>(null);
  const [gymExercises, setGymExercises] = useState<GymExercise[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(() => {
    if (!profile || !memberId) return;
    Promise.all([listMemberPlan(memberId), listGymExercises(profile.gymId)]).then(([plan, exercises]) => {
      setSelection(
        plan.map((p) => ({
          source: p.exerciseSource,
          ref: p.exerciseRef,
          sets: p.sets,
          target: p.target,
          targetUnit: p.targetUnit,
          restSeconds: p.restSeconds,
        }))
      );
      setGymExercises(exercises);
    });
  }, [profile, memberId]);

  useFocusEffect(load);

  useEffect(() => {
    setSaved(false);
  }, [selection]);

  function toggle(source: ExerciseSource, ref: string, movementType: MovementType) {
    setSelection((current) => {
      if (!current) return current;
      const exists = current.some((c) => key(c.source, c.ref) === key(source, ref));
      if (exists) return current.filter((c) => key(c.source, c.ref) !== key(source, ref));
      return [...current, { source, ref, ...defaultVolumeFor(movementType) }];
    });
  }

  function update(source: ExerciseSource, ref: string, patch: Partial<MemberPlanItemInput>) {
    setSelection((current) => {
      if (!current) return current;
      return current.map((c) => (key(c.source, c.ref) === key(source, ref) ? { ...c, ...patch } : c));
    });
  }

  function itemOf(source: ExerciseSource, ref: string): { item: MemberPlanItemInput; order: number } | null {
    if (!selection) return null;
    const order = selection.findIndex((c) => key(c.source, c.ref) === key(source, ref));
    return order === -1 ? null : { item: selection[order], order };
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
        Tocca il nome per aggiungere/rimuovere; una volta selezionato, imposta serie/ripetizioni/riposo —{' '}
        {selection.length} selezionati.
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
            const found = itemOf('gym_custom', exercise.id);
            return (
              <CustomRow
                key={exercise.id}
                exercise={exercise}
                item={found?.item ?? null}
                order={found?.order ?? 0}
                onToggle={() => toggle('gym_custom', exercise.id, exercise.movementType)}
                onUpdate={(patch) => update('gym_custom', exercise.id, patch)}
              />
            );
          })}
        </>
      )}

      <Text style={styles.sectionTitle}>Libreria dell'app</Text>
      {builtinLibrary.map((exercise) => {
        const found = itemOf('builtin', exercise.id);
        return (
          <BuiltinRow
            key={exercise.id}
            exerciseId={exercise.id}
            item={found?.item ?? null}
            order={found?.order ?? 0}
            onToggle={() => toggle('builtin', exercise.id, builtinMovementById.get(exercise.id) ?? 'reps')}
            onUpdate={(patch) => update('builtin', exercise.id, patch)}
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    marginBottom: spacing.xs,
    overflow: 'hidden',
    ...shadows.card,
  },
  rowSelected: { borderColor: colors.primary, backgroundColor: '#EEF5F0' },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
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
  controls: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  controlsHint: { ...typography.caption, color: colors.textMuted },
  stepperRow: { flexDirection: 'row', justifyContent: 'space-around' },
});
