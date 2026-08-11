import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line } from 'react-native-svg';

import { colors } from '../../theme/theme';
import type { ExerciseAvatarAnimation } from '../../domain/exercises/avatarPoses';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

function interp(a: number, b: number, t: number) {
  'worklet';
  return a + (b - a) * t;
}

export function StickFigureAvatar({
  poseStart,
  poseEnd,
  viewBoxWidth,
  viewBoxHeight,
  groundY,
  durationMs,
}: ExerciseAvatarAnimation) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: durationMs, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [durationMs, progress]);

  const pose = useDerivedValue(() => {
    const t = progress.value;
    return {
      head: { x: interp(poseStart.head.x, poseEnd.head.x, t), y: interp(poseStart.head.y, poseEnd.head.y, t) },
      neck: { x: interp(poseStart.neck.x, poseEnd.neck.x, t), y: interp(poseStart.neck.y, poseEnd.neck.y, t) },
      hip: { x: interp(poseStart.hip.x, poseEnd.hip.x, t), y: interp(poseStart.hip.y, poseEnd.hip.y, t) },
      elbow: { x: interp(poseStart.elbow.x, poseEnd.elbow.x, t), y: interp(poseStart.elbow.y, poseEnd.elbow.y, t) },
      hand: { x: interp(poseStart.hand.x, poseEnd.hand.x, t), y: interp(poseStart.hand.y, poseEnd.hand.y, t) },
      knee: { x: interp(poseStart.knee.x, poseEnd.knee.x, t), y: interp(poseStart.knee.y, poseEnd.knee.y, t) },
      foot: { x: interp(poseStart.foot.x, poseEnd.foot.x, t), y: interp(poseStart.foot.y, poseEnd.foot.y, t) },
    };
  });

  const headProps = useAnimatedProps(() => ({ cx: pose.value.head.x, cy: pose.value.head.y }));
  const torsoProps = useAnimatedProps(() => ({
    x1: pose.value.neck.x,
    y1: pose.value.neck.y,
    x2: pose.value.hip.x,
    y2: pose.value.hip.y,
  }));
  const upperArmProps = useAnimatedProps(() => ({
    x1: pose.value.neck.x,
    y1: pose.value.neck.y,
    x2: pose.value.elbow.x,
    y2: pose.value.elbow.y,
  }));
  const forearmProps = useAnimatedProps(() => ({
    x1: pose.value.elbow.x,
    y1: pose.value.elbow.y,
    x2: pose.value.hand.x,
    y2: pose.value.hand.y,
  }));
  const thighProps = useAnimatedProps(() => ({
    x1: pose.value.hip.x,
    y1: pose.value.hip.y,
    x2: pose.value.knee.x,
    y2: pose.value.knee.y,
  }));
  const shinProps = useAnimatedProps(() => ({
    x1: pose.value.knee.x,
    y1: pose.value.knee.y,
    x2: pose.value.foot.x,
    y2: pose.value.foot.y,
  }));

  return (
    <View style={styles.wrap}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        <Line x1={0} y1={groundY} x2={viewBoxWidth} y2={groundY} stroke={colors.border} strokeWidth={2} />
        <AnimatedLine animatedProps={torsoProps} stroke={colors.primaryDark} strokeWidth={4} strokeLinecap="round" />
        <AnimatedLine
          animatedProps={upperArmProps}
          stroke={colors.primaryDark}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <AnimatedLine animatedProps={forearmProps} stroke={colors.primaryDark} strokeWidth={3} strokeLinecap="round" />
        <AnimatedLine animatedProps={thighProps} stroke={colors.primaryDark} strokeWidth={4} strokeLinecap="round" />
        <AnimatedLine animatedProps={shinProps} stroke={colors.primaryDark} strokeWidth={4} strokeLinecap="round" />
        <AnimatedCircle animatedProps={headProps} r={9} fill={colors.primary} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    aspectRatio: 1.4,
  },
});
