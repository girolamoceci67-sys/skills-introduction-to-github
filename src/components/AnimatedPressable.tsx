import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { BaseAnimationBuilder, EntryExitAnimationFunction } from 'react-native-reanimated';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  children?: ReactNode;
  entering?: BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;
}

/** Pressable con una leggera contrazione a molla al tocco, usata al posto del solo cambio di opacità. */
export function AnimatedPressable({
  style,
  scaleTo = 0.96,
  onPressIn,
  onPressOut,
  disabled,
  entering,
  ...rest
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressableBase
      disabled={disabled}
      entering={entering}
      onPressIn={(e) => {
        if (!disabled) scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, { damping: 12, stiffness: 220 });
        onPressOut?.(e);
      }}
      style={[style, animatedStyle]}
      {...rest}
    />
  );
}
