import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/theme';

interface SelectableCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

export function SelectableCard({ title, description, selected, onPress }: SelectableCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.textWrap}>
        <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#EEF5F0',
  },
  textWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  titleSelected: {
    color: colors.primaryDark,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
