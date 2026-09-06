import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';

import { useAuthSession } from '../src/auth/authSession';
import { getCurrentUser } from '../src/data/repositories/userRepository';
import { hasStoredLanguage } from '../src/i18n';
import { colors } from '../src/theme/theme';

type Status = 'loading' | 'needs_language' | 'needs_login' | 'needs_onboarding' | 'ready';

export default function Index() {
  const isAuthenticated = useAuthSession((state) => state.isAuthenticated);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const hasLanguage = await hasStoredLanguage();
      if (!hasLanguage) {
        if (!cancelled) setStatus('needs_language');
        return;
      }
      if (!isAuthenticated) {
        if (!cancelled) setStatus('needs_login');
        return;
      }
      const user = await getCurrentUser();
      if (cancelled) return;
      setStatus(user ? 'ready' : 'needs_onboarding');
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (status === 'needs_language') {
    return <Redirect href="/language" />;
  }

  if (status === 'needs_login') {
    return <Redirect href="/login" />;
  }

  if (status === 'needs_onboarding') {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
