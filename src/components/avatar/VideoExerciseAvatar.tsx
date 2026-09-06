import { StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

/** Sorgente video richiesta da bundler Metro (require di un asset locale, non un URI). */
export function VideoExerciseAvatar({ source }: { source: number }) {
  const player = useVideoPlayer(source, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <VideoView
      style={styles.video}
      player={player}
      contentFit="contain"
      nativeControls={false}
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 0.75,
  },
});
