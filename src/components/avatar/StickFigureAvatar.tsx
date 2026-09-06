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
import Svg, { Circle, Defs, Ellipse, Line, Polygon, RadialGradient, Stop } from 'react-native-svg';

import { colors, figureColors } from '../../theme/theme';
import type { ExerciseAvatarAnimation } from '../../domain/exercises/avatarPoses';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedLine = Animated.createAnimatedComponent(Line);

function interp(a: number, b: number, t: number) {
  'worklet';
  return a + (b - a) * t;
}

/**
 * Poligono a "trapezio" lungo il segmento (x1,y1)-(x2,y2), largo w1 a un capo e w2 all'altro:
 * dà ad arti e tronco una forma affusolata (più larga alla spalla/anca, più stretta al polso/
 * caviglia) invece di un tratto a spessore costante, per una silhouette più umana.
 */
function limbPoints(x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) {
  'worklet';
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const h1 = w1 / 2;
  const h2 = w2 / 2;
  return `${x1 + nx * h1},${y1 + ny * h1} ${x2 + nx * h2},${y2 + ny * h2} ${x2 - nx * h2},${y2 - ny * h2} ${x1 - nx * h1},${y1 - ny * h1}`;
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
    cy: pose.value.head.y - 3.8,
  }));
  const hairProps = useAnimatedProps(() => ({
    cx: pose.value.head.x,
    cy: pose.value.head.y - 6.3,
  }));

  const torsoProps = useAnimatedProps(() => ({
    points: limbPoints(pose.value.neck.x, pose.value.neck.y, pose.value.hip.x, pose.value.hip.y, 15, 12),
  }));
  const upperArmProps = useAnimatedProps(() => ({
    points: limbPoints(pose.value.neck.x, pose.value.neck.y, pose.value.elbow.x, pose.value.elbow.y, 7.5, 6.2),
  }));
  const forearmProps = useAnimatedProps(() => ({
    points: limbPoints(pose.value.elbow.x, pose.value.elbow.y, pose.value.hand.x, pose.value.hand.y, 6, 5),
  }));
  const thighProps = useAnimatedProps(() => ({
    points: limbPoints(pose.value.hip.x, pose.value.hip.y, pose.value.knee.x, pose.value.knee.y, 12, 8.5),
  }));
  const shinProps = useAnimatedProps(() => ({
    points: limbPoints(pose.value.knee.x, pose.value.knee.y, pose.value.foot.x, pose.value.foot.y, 7.5, 5.5),
  }));

  const elbowJointProps = useAnimatedProps(() => ({ cx: pose.value.elbow.x, cy: pose.value.elbow.y }));
  const kneeJointProps = useAnimatedProps(() => ({ cx: pose.value.knee.x, cy: pose.value.knee.y }));
  const handProps = useAnimatedProps(() => ({ cx: pose.value.hand.x, cy: pose.value.hand.y }));
  const ankleProps = useAnimatedProps(() => ({ cx: pose.value.foot.x, cy: pose.value.foot.y }));
  // La "scarpa" è un poligono affusolato che prolunga la direzione ginocchio->piede oltre la
  // caviglia (stessa tecnica dei poligoni degli arti), così resta plausibile in ogni posa senza
  // ricorrere a rotazioni SVG (non supportate in modo affidabile dal renderer web).
  const shoeProps = useAnimatedProps(() => {
    const dx = pose.value.foot.x - pose.value.knee.x;
    const dy = pose.value.foot.y - pose.value.knee.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const toeX = pose.value.foot.x + (dx / len) * 9;
    const toeY = pose.value.foot.y + (dy / len) * 9;
    return { points: limbPoints(pose.value.foot.x, pose.value.foot.y, toeX, toeY, 7, 3) };
  });

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
            <Stop offset="0%" stopColor={figureColors.skin} />
            <Stop offset="100%" stopColor={figureColors.skinShadow} />
          </RadialGradient>
        </Defs>

        <Line x1={0} y1={groundY} x2={viewBoxWidth} y2={groundY} stroke={colors.border} strokeWidth={2} />
        <AnimatedEllipse
          animatedProps={groundShadowProps}
          cy={groundY + 2}
          ry={viewBoxWidth * 0.035}
          fill={figureColors.shadowOnGround}
        />

        <AnimatedPolygon animatedProps={thighProps} fill={figureColors.bottoms} />
        <AnimatedPolygon animatedProps={shinProps} fill={figureColors.skin} />
        <AnimatedCircle animatedProps={kneeJointProps} r={4.2} fill={figureColors.bottoms} />
        <AnimatedCircle animatedProps={ankleProps} r={3.4} fill={figureColors.skinShadow} />
        <AnimatedPolygon animatedProps={shoeProps} fill={figureColors.shoes} />

        <AnimatedPolygon animatedProps={torsoProps} fill={figureColors.top} />

        <AnimatedPolygon animatedProps={upperArmProps} fill={figureColors.skin} />
        <AnimatedPolygon animatedProps={forearmProps} fill={figureColors.skin} />
        <AnimatedCircle animatedProps={elbowJointProps} r={3.6} fill={figureColors.skinShadow} />
        {!showDumbbell && <AnimatedCircle animatedProps={handProps} r={4} fill={figureColors.skinShadow} />}

        <AnimatedCircle animatedProps={headProps} r={10.5} fill="url(#headGradient)" />
        <AnimatedEllipse animatedProps={hairProps} rx={9.4} ry={6.2} fill={figureColors.hair} />
        <AnimatedCircle animatedProps={headHighlightProps} r={2.4} fill="rgba(255,255,255,0.4)" />

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
