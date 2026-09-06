import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '../../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import type { Equipment, MovementType, MuscleGroup } from '../../../src/domain/exercises/types';
import { createGymExercise, listGymExercises } from '../../../src/gym/gymRepository';
import { useGymSession } from '../../../src/gym/gymSession';
import type { GymExercise } from '../../../src/gym/types';
import { colors, radii, shadows, spacing, typography } from '../../../src/theme/theme';

const MUSCLE_GROUPS: { value: MuscleGroup; label: string }[] = [
  { value: 'full_body', label: 'Tutto il corpo' },
  { value: 'legs_glutes', label: 'Gambe e glutei' },
  { value: 'core', label: 'Core' },
  { value: 'push', label: 'Spinta' },
  { value: 'pull', label: 'Trazione' },
  { value: 'mobility_cardio', label: 'Mobilità/cardio' },
];

const MOVEMENT_TYPES: { value: MovementType; label: string }[] = [
  { value: 'reps', label: 'Ripetizioni' },
  { value: 'hold', label: 'Mantenimento a tempo' },
];

const EQUIPMENT_TYPES: { value: Equipment; label: string }[] = [
  { value: 'bodyweight', label: 'Corpo libero' },
  { value: 'dumbbell', label: 'Manubri' },
];

function Chip<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => (
        <AnimatedPressable
          key={option.value}
          scaleTo={0.95}
          style={[styles.chip, selected === option.value && styles.chipSelected]}
          onPress={() => onSelect(option.value)}
        >
          <Text style={[styles.chipLabel, selected === option.value && styles.chipLabelSelected]}>
            {option.label}
          </Text>
        </AnimatedPressable>
      ))}
    </View>
  );
}

export default function GymExercisesScreen() {
  const profile = useGymSession((state) => state.profile);
  const [exercises, setExercises] = useState<GymExercise[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('full_body');
  const [movementType, setMovementType] = useState<MovementType>('reps');
  const [equipment, setEquipment] = useState<Equipment>('bodyweight');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!profile) return;
    listGymExercises(profile.gymId).then(setExercises);
  }, [profile]);

  useFocusEffect(load);

  async function handleCreate() {
    if (!profile) return;
    setError(null);
    if (!name.trim() || !instructions.trim()) {
      setError('Nome e istruzioni sono obbligatori.');
      return;
    }
    setSubmitting(true);
    try {
      await createGymExercise({
        gymId: profile.gymId,
        createdBy: profile.id,
        name: name.trim(),
        instructions: instructions.trim(),
        muscleGroup,
        movementType,
        equipment,
      });
      setName('');
      setInstructions('');
      setShowForm(false);
      load();
    } catch (e) {
      setError('Salvataggio non riuscito. Riprova.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!profile) {
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
      <Text style={styles.title}>Esercizi personalizzati</Text>
      <Text style={styles.subtitle}>
        Oltre alla libreria già inclusa nell'app, qui puoi aggiungere esercizi tuoi: arrivano subito ai tuoi
        iscritti, senza bisogno di aggiornare l'app.
      </Text>

      <PrimaryButton
        label={showForm ? 'Annulla' : '+ Nuovo esercizio'}
        variant={showForm ? 'secondary' : 'primary'}
        onPress={() => setShowForm((v) => !v)}
      />

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Es. Affondi in camminata" placeholderTextColor={colors.textMuted} />

          <Text style={styles.label}>Istruzioni</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Come eseguirlo, passo dopo passo"
            placeholderTextColor={colors.textMuted}
            multiline
          />

          <Text style={styles.label}>Gruppo muscolare</Text>
          <Chip options={MUSCLE_GROUPS} selected={muscleGroup} onSelect={setMuscleGroup} />

          <Text style={styles.label}>Tipo</Text>
          <Chip options={MOVEMENT_TYPES} selected={movementType} onSelect={setMovementType} />

          <Text style={styles.label}>Attrezzatura</Text>
          <Chip options={EQUIPMENT_TYPES} selected={equipment} onSelect={setEquipment} />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton label={submitting ? 'Salvataggio…' : 'Salva esercizio'} onPress={handleCreate} disabled={submitting} />
        </View>
      )}

      <Text style={styles.sectionTitle}>I tuoi esercizi ({exercises?.length ?? 0})</Text>
      {exercises === null && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />}
      {exercises?.length === 0 && <Text style={styles.emptyText}>Nessun esercizio personalizzato ancora.</Text>}
      {exercises?.map((exercise, index) => (
        <Animated.View key={exercise.id} entering={FadeInDown.delay(Math.min(index, 8) * 40)} style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseMeta}>{exercise.instructions}</Text>
        </Animated.View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
  form: { gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.lg },
  label: { ...typography.caption, color: colors.textMuted, marginTop: spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.body,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  chipSelected: { borderColor: colors.primary, backgroundColor: '#EEF5F0' },
  chipLabel: { ...typography.caption, color: colors.text },
  chipLabelSelected: { color: colors.primaryDark, fontWeight: '700' },
  error: { ...typography.caption, color: colors.danger },
  sectionTitle: { ...typography.heading, fontSize: 17, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  emptyText: { ...typography.body, color: colors.textMuted },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  exerciseName: { ...typography.body, fontWeight: '700', color: colors.text },
  exerciseMeta: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
