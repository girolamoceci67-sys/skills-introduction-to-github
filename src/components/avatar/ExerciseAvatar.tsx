import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { avatarPoses } from '../../domain/exercises/avatarPoses';
import { videoOverrides } from '../../domain/exercises/videoOverrides';
import { colors, radii, shadows, spacing, typography } from '../../theme/theme';
import { StickFigureAvatar } from './StickFigureAvatar';
import { VideoExerciseAvatar } from './VideoExerciseAvatar';

export function ExerciseAvatar({ exerciseId }: { exerciseId: string }) {
  const { t } = useTranslation();
  const videoSource = videoOverrides[exerciseId];
  const animation = avatarPoses[exerciseId];
  if (!videoSource && !animation) return null;

  return (
    <View style={styles.card}>
      {videoSource ? <VideoExerciseAvatar source={videoSource} /> : <StickFigureAvatar {...animation!} />}
      <Text style={styles.caption}>{t('library.previewCaption')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  caption: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});
