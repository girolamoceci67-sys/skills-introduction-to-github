import { StyleSheet, Text } from 'react-native';

import { Screen } from '../../src/components/Screen';
import { colors, typography } from '../../src/theme/theme';

export default function Library() {
  return (
    <Screen>
      <Text style={styles.title}>Libreria esercizi</Text>
      <Text style={styles.body}>
        Sarà implementata nel prossimo modulo (Modulo 2): elenco di esercizi a corpo libero con
        istruzioni, segnali di corretta esecuzione e varianti facilitate/avanzate.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.title, color: colors.text, marginBottom: 12 },
  body: { ...typography.body, color: colors.textMuted },
});
