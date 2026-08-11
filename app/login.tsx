import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { useAuthSession } from '../src/auth/authSession';
import { createAccount, hasStoredAccount, verifyLogin } from '../src/auth/authStorage';
import { colors, radii, spacing, typography } from '../src/theme/theme';

type Mode = 'checking' | 'create' | 'login';

export default function Login() {
  const { t } = useTranslation();
  const markAuthenticated = useAuthSession((state) => state.markAuthenticated);
  const [mode, setMode] = useState<Mode>('checking');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    hasStoredAccount().then((exists) => {
      if (!cancelled) setMode(exists ? 'login' : 'create');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate() {
    setError(null);
    if (!username.trim()) {
      setError(t('auth.errorUsernameRequired'));
      return;
    }
    if (password.length < 6) {
      setError(t('auth.errorPasswordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.errorPasswordMismatch'));
      return;
    }
    setSubmitting(true);
    await createAccount(username.trim(), password);
    setSubmitting(false);
    markAuthenticated();
    router.replace('/');
  }

  async function handleLogin() {
    setError(null);
    if (!username.trim()) {
      setError(t('auth.errorUsernameRequired'));
      return;
    }
    setSubmitting(true);
    const ok = await verifyLogin(username.trim(), password);
    setSubmitting(false);
    if (!ok) {
      setError(t('auth.errorInvalidCredentials'));
      return;
    }
    markAuthenticated();
    router.replace('/');
  }

  if (mode === 'checking') {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  const isCreate = mode === 'create';

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>{isCreate ? t('auth.createTitle') : t('auth.loginTitle')}</Text>
        <Text style={styles.subtitle}>{isCreate ? t('auth.createSubtitle') : t('auth.loginSubtitle')}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>{t('auth.usernameLabel')}</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder={t('auth.usernamePlaceholder')}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>{t('auth.passwordLabel')}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder={t('auth.passwordPlaceholder')}
          placeholderTextColor={colors.textMuted}
          secureTextEntry
        />

        {isCreate && (
          <>
            <Text style={styles.label}>{t('auth.confirmPasswordLabel')}</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              placeholderTextColor={colors.textMuted}
              secureTextEntry
            />
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <Text style={styles.hint}>{t('auth.forgotHint')}</Text>

      <PrimaryButton
        label={submitting ? t('common.saving') : isCreate ? t('auth.createButton') : t('auth.loginButton')}
        onPress={isCreate ? handleCreate : handleLogin}
        disabled={submitting}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { marginBottom: spacing.lg },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.textMuted },
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
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});
