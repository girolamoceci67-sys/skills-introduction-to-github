import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { AnimatedPressable } from '../../src/components/AnimatedPressable';
import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { gymBackendConfigured } from '../../src/gym/supabaseClient';
import { signInMember } from '../../src/gym/gymRepository';
import { useGymSession } from '../../src/gym/gymSession';
import { colors, radii, spacing, typography } from '../../src/theme/theme';

export default function GymLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    setError(null);
    if (!email.trim() || !password) {
      setError('Inserisci email e password.');
      return;
    }
    setSubmitting(true);
    try {
      await signInMember(email.trim(), password);
      await useGymSession.getState().refresh();
      router.replace('/gym');
    } catch (e) {
      setError('Accesso non riuscito. Controlla email e password.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!gymBackendConfigured) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>Modalità palestra non configurata</Text>
          <Text style={styles.subtitle}>
            Questa build dell'app non ha ancora le chiavi del backend collegate. Riprova più tardi.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Accesso palestra</Text>
        <Text style={styles.subtitle}>Per titolari/istruttori (master) e iscritti. Usa le credenziali ricevute.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="nome@esempio.it"
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
          placeholder="••••••••"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <PrimaryButton label={submitting ? 'Accesso in corso…' : 'Accedi'} onPress={handleLogin} disabled={submitting} />

      <AnimatedPressable style={styles.backLink} onPress={() => router.back()} accessibilityRole="button">
        <Text style={styles.backLinkLabel}>← Torna indietro</Text>
      </AnimatedPressable>

      <AnimatedPressable style={styles.backLink} onPress={() => router.push('/gym/create')} accessibilityRole="button">
        <Text style={styles.backLinkLabel}>Sei una palestra e non hai ancora un account? Registrati →</Text>
      </AnimatedPressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  header: { marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
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
