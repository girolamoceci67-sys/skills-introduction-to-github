import { StyleSheet, Text } from 'react-native';

import { Screen } from '../../src/components/Screen';
import { colors, typography } from '../../src/theme/theme';

export default function Progress() {
  return (
    <Screen>
      <Text style={styles.title}>Progressi</Text>
      <Text style={styles.body}>
        Sarà implementato nel Modulo 4: storico sessioni, streak di costanza, grafico di aderenza
        e goal-setting settimanale con promemoria.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: 12 },
  body: { ...typography.body, color: colors.textMuted },
});
