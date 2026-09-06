import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { AnimatedPressable } from '../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { createGymAccount, signInMember } from '../../src/gym/gymRepository';
import { useGymSession } from '../../src/gym/gymSession';
import { colors, radii, spacing, typography } from '../../src/theme/theme';

export default function CreateGym() {
  const [gymName, setGymName] = useState('');
  const [masterName, setMasterName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setError(null);
    if (!gymName.trim() || !masterName.trim() || !email.trim() || password.length < 6) {
      setError('Compila tutti i campi (password di almeno 6 caratteri).');
      return;
    }
    setSubmitting(true);
    try {
      await createGymAccount({
        gymName: gymName.trim(),
        masterEmail: email.trim(),
        masterPassword: password,
        masterDisplayName: masterName.trim(),
      });
      await signInMember(email.trim(), password);
      await useGymSession.getState().refresh();
      router.replace('/gym');
    } catch (e) {
      setError('Registrazione non riuscita. Riprova.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Registra la tua palestra</Text>
      <Text style={styles.subtitle}>Crea il tuo account master: da qui gestirai iscritti e piani.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome della palestra</Text>
        <TextInput
          style={styles.input}
          value={gymName}
          onChangeText={setGymName}
          placeholder="Es. Palestra Corpo Libero"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Il tuo nome</Text>
        <TextInput
          style={styles.input}
          value={masterName}
          onChangeText={setMasterName}
          placeholder="Es. Giulia Bianchi"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="tu@esempio.it"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Almeno 6 caratteri"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <PrimaryButton label={submitting ? 'Registrazione…' : 'Crea la mia palestra'} onPress={handleCreate} disabled={submitting} />

      <AnimatedPressable style={styles.backLink} onPress={() => router.back()} accessibilityRole="button">
        <Text style={styles.backLinkLabel}>← Torna indietro</Text>
      </AnimatedPressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg, textAlign: 'center' },
  form: { gap: spacing.sm, marginBottom: spacing.md },
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
  error: { ...typography.caption, color: colors.danger, marginTop: spacing.xs },
  backLink: { marginTop: spacing.md, alignSelf: 'center' },
  backLinkLabel: { ...typography.body, color: colors.primary, fontWeight: '600' },
});
