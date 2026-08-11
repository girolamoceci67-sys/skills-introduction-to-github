import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { PrimaryButton } from '../PrimaryButton';
import { colors, radii, spacing, typography } from '../../theme/theme';

interface ConfettiPieceConfig {
  left: number;
  delay: number;
  color: string;
  rotate: number;
}

const CONFETTI: ConfettiPieceConfig[] = [
  { left: 8, delay: 0, color: colors.primary, rotate: 20 },
  { left: 22, delay: 90, color: colors.accent, rotate: -30 },
  { left: 36, delay: 40, color: colors.warning, rotate: 10 },
  { left: 50, delay: 170, color: colors.primaryDark, rotate: -22 },
  { left: 64, delay: 60, color: colors.accent, rotate: 25 },
  { left: 78, delay: 130, color: colors.primary, rotate: -15 },
  { left: 92, delay: 20, color: colors.warning, rotate: 18 },
];

function ConfettiPiece({ left, delay, color, rotate }: ConfettiPieceConfig) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(1, { duration: 1100, easing: Easing.out(Easing.quad) }));
  }, [delay, progress]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: -20 + progress.value * 260 },
      { rotate: `${rotate + progress.value * rotate * 3}deg` },
    ],
    opacity: 1 - progress.value * 0.9,
  }));

  return <Animated.View style={[styles.confettiPiece, { left: `${left}%`, backgroundColor: color }, style]} />;
}

interface SessionCompleteCelebrationProps {
  title: string;
  subtitle: string;
  onContinue: () => void;
}

/** Schermata di rinforzo positivo mostrata subito dopo il salvataggio di una sessione completata. */
export function SessionCompleteCelebration({ title, subtitle, onContinue }: SessionCompleteCelebrationProps) {
  const badgeOpacity = useSharedValue(0);
  const badgeScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    badgeOpacity.value = withTiming(1, { duration: 200 });
    badgeScale.value = withSequence(
      withTiming(1.15, { duration: 380, easing: Easing.out(Easing.back(1.8)) }),
      withTiming(1, { duration: 160 })
    );
    textOpacity.value = withDelay(280, withTiming(1, { duration: 320 }));
  }, [badgeOpacity, badgeScale, textOpacity]);

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  return (
    <View style={styles.container}>
      <View style={styles.confettiLayer} pointerEvents="none">
        {CONFETTI.map((piece, index) => (
          <ConfettiPiece key={index} {...piece} />
        ))}
      </View>

      <Animated.View style={[styles.badge, badgeStyle]}>
        <Text style={styles.check}>✓</Text>
      </Animated.View>

      <Animated.View style={textStyle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Animated.View>

      <View style={styles.buttonWrap}>
        <PrimaryButton label="Continua" onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  confettiLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  confettiPiece: {
    position: 'absolute',
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  badge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: { ...typography.title, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xs },
  buttonWrap: { width: '100%', marginTop: spacing.lg, borderRadius: radii.md },
});
