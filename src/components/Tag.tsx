import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/theme';

export function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#EEF5F0',
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.caption,
    color: colors.primaryDark,
  },
});
