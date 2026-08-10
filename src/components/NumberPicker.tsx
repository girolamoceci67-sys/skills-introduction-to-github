import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/theme';

interface NumberPickerProps {
  options: number[];
  selected: number | null;
  onSelect: (value: number) => void;
}

export function NumberPicker({ options, selected, onSelect }: NumberPickerProps) {
  return (
    <View style={styles.row}>
      {options.map((value) => (
        <Pressable
          key={value}
          accessibilityRole="button"
          accessibilityState={{ selected: selected === value }}
          onPress={() => onSelect(value)}
          style={[styles.button, selected === value && styles.buttonSelected]}
        >
          <Text style={[styles.label, selected === value && styles.labelSelected]}>{value}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  button: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  buttonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  label: { ...typography.body, fontWeight: '700', color: colors.text },
  labelSelected: { color: '#FFFFFF' },
});
