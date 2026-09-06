import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors, radii, spacing, typography } from '../theme/theme';

interface CountdownTimerProps {
  durationSeconds: number;
  label: string;
  onComplete: () => void;
}

/**
 * Conto alla rovescia con transizione automatica: chiama onComplete una sola volta
 * al raggiungimento dello zero. Il chiamante deve passare una `key` diversa ad ogni
 * nuovo conto alla rovescia (nuovo set/esercizio) per farlo ripartire da capo.
 */
export function CountdownTimer({ durationSeconds, label, onComplete }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const progress = useSharedValue(1);
  const completedRef = useRef(false);

  useEffect(() => {
    progress.value = 1;
    progress.value = withTiming(0, { duration: durationSeconds * 1000 });

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSeconds]);

  useEffect(() => {
    if (remaining === 0 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{remaining}s</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, barStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.sm, width: '100%' },
  label: { ...typography.body, color: colors.textMuted },
  time: { ...typography.title, fontSize: 48, color: colors.text },
  track: {
    width: '100%',
    height: 10,
    borderRadius: radii.sm,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radii.sm,
  },
});
