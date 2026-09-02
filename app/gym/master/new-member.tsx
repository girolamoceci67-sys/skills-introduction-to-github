import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { Screen } from '../../../src/components/Screen';
import { createMemberAccount, type NewMemberCredentials } from '../../../src/gym/gymRepository';
import { colors, radii, shadows, spacing, typography } from '../../../src/theme/theme';

export default function NewMember() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<NewMemberCredentials | null>(null);

  async function handleCreate() {
    setError(null);
    if (!displayName.trim()) {
      setError('Inserisci nome e cognome.');
      return;
    }
    setSubmitting(true);
    try {
      const created = await createMemberAccount(displayName.trim(), email.trim() || undefined);
      setCredentials(created);
    } catch (e) {
      setError('Creazione non riuscita. Riprova.');
    } finally {
      setSubmitting(false);
    }
  }

  if (credentials) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.title}>Account creato ✅</Text>
          <Text style={styles.subtitle}>
            Consegna queste credenziali a {displayName.trim()} — non verranno più mostrate qui.
          </Text>

          <View style={styles.credCard}>
            <Text style={styles.credLabel}>Email</Text>
            <Text style={styles.credValue}>{credentials.email}</Text>
            <Text style={[styles.credLabel, { marginTop: spacing.sm }]}>Password</Text>
            <Text style={styles.credValue}>{credentials.password}</Text>
          </View>

          <PrimaryButton label="Fatto" onPress={() => router.replace(`/gym/master/member/${credentials.memberId}`)} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Nuovo iscritto</Text>
      <Text style={styles.subtitle}>Crea l'account: genero io una password sicura da consegnargli.</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome e cognome</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Es. Mario Rossi"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Email (opzionale)</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="mario@esempio.it — se vuota ne genero una interna"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <PrimaryButton label={submitting ? 'Creazione…' : 'Crea account'} onPress={handleCreate} disabled={submitting} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
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
  credCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    width: '100%',
    gap: 2,
    ...shadows.card,
  },
  credLabel: { ...typography.caption, color: colors.textMuted },
  credValue: { ...typography.title, fontSize: 20, color: colors.text },
});
