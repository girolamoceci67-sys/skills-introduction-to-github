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
import Svg, { Circle, Defs, Ellipse, Line, RadialGradient, Stop } from 'react-native-svg';

import { colors, figureColors } from '../../theme/theme';
import type { ExerciseAvatarAnimation } from '../../domain/exercises/avatarPoses';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

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
  showDumbbell,
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
  const headHighlightProps = useAnimatedProps(() => ({
    cx: pose.value.head.x - 3,
    cy: pose.value.head.y - 3.5,
  }));
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
  const elbowJointProps = useAnimatedProps(() => ({ cx: pose.value.elbow.x, cy: pose.value.elbow.y }));
  const kneeJointProps = useAnimatedProps(() => ({ cx: pose.value.knee.x, cy: pose.value.knee.y }));
  const handProps = useAnimatedProps(() => ({ cx: pose.value.hand.x, cy: pose.value.hand.y }));
  const footProps = useAnimatedProps(() => ({ cx: pose.value.foot.x, cy: pose.value.foot.y }));
  // L'ombra a terra segue il centro di massa (bacino) e si assottiglia quando il bacino si alza
  // rispetto al terreno (es. fase di salto), dando un minimo di senso di profondità.
  const groundShadowProps = useAnimatedProps(() => {
    const lift = Math.max(0, groundY - pose.value.hip.y - (groundY - poseStart.hip.y));
    const shrink = Math.min(0.5, lift / 60);
    return {
      cx: pose.value.hip.x,
      rx: (viewBoxWidth * 0.16) * (1 - shrink),
    };
  });
  // Manubrio schematico: una barra corta centrata sulla mano con un disco a ogni estremità.
  // L'offset orizzontale fisso è una semplificazione voluta (coerente con lo stile minimale
  // della figura), non un manubrio orientato secondo l'angolo reale dell'avambraccio.
  const dumbbellBarProps = useAnimatedProps(() => ({
    x1: pose.value.hand.x - 7,
    y1: pose.value.hand.y,
    x2: pose.value.hand.x + 7,
    y2: pose.value.hand.y,
  }));
  const dumbbellLeftPlateProps = useAnimatedProps(() => ({ cx: pose.value.hand.x - 7, cy: pose.value.hand.y }));
  const dumbbellRightPlateProps = useAnimatedProps(() => ({ cx: pose.value.hand.x + 7, cy: pose.value.hand.y }));

  return (
    <View style={styles.wrap}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        <Defs>
          <RadialGradient id="headGradient" cx="35%" cy="30%" r="75%">
            <Stop offset="0%" stopColor={colors.primary} />
            <Stop offset="100%" stopColor={colors.primaryDark} />
          </RadialGradient>
        </Defs>

        <Line x1={0} y1={groundY} x2={viewBoxWidth} y2={groundY} stroke={colors.border} strokeWidth={2} />
        <AnimatedEllipse
          animatedProps={groundShadowProps}
          cy={groundY + 2}
          ry={viewBoxWidth * 0.035}
          fill={figureColors.shadowOnGround}
        />

        <AnimatedLine
          animatedProps={thighProps}
          stroke={figureColors.bottoms}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <AnimatedLine animatedProps={shinProps} stroke={figureColors.skin} strokeWidth={7} strokeLinecap="round" />
        <AnimatedCircle animatedProps={kneeJointProps} r={4} fill={figureColors.bottoms} />
        <AnimatedCircle animatedProps={footProps} r={5} fill={figureColors.shoes} />

        <AnimatedLine animatedProps={torsoProps} stroke={figureColors.top} strokeWidth={12} strokeLinecap="round" />

        <AnimatedLine
          animatedProps={upperArmProps}
          stroke={figureColors.skin}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <AnimatedLine
          animatedProps={forearmProps}
          stroke={figureColors.skin}
          strokeWidth={5.5}
          strokeLinecap="round"
        />
        <AnimatedCircle animatedProps={elbowJointProps} r={3.5} fill={figureColors.skinShadow} />
        {!showDumbbell && <AnimatedCircle animatedProps={handProps} r={4} fill={figureColors.skinShadow} />}

        <AnimatedCircle animatedProps={headProps} r={11} fill="url(#headGradient)" />
        <AnimatedCircle animatedProps={headHighlightProps} r={2.6} fill="rgba(255,255,255,0.35)" />

        {showDumbbell && (
          <>
            <AnimatedLine animatedProps={dumbbellBarProps} stroke={colors.accent} strokeWidth={2.5} strokeLinecap="round" />
            <AnimatedCircle animatedProps={dumbbellLeftPlateProps} r={4} fill={colors.accent} />
            <AnimatedCircle animatedProps={dumbbellRightPlateProps} r={4} fill={colors.accent} />
          </>
        )}
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
