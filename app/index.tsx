import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';

import { getCurrentUser } from '../src/data/repositories/userRepository';
import { colors } from '../src/theme/theme';

export default function Index() {
  const [status, setStatus] = useState<'loading' | 'needs_onboarding' | 'ready'>('loading');

  useEffect(() => {
    let cancelled = false;
    getCurrentUser().then((user) => {
      if (cancelled) return;
      setStatus(user ? 'ready' : 'needs_onboarding');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
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
