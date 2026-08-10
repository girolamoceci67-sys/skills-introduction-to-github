import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { PrimaryButton } from '../../src/components/PrimaryButton';
import { Screen } from '../../src/components/Screen';
import { colors, spacing, typography } from '../../src/theme/theme';

export default function OnboardingWelcome() {
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Iniziamo</Text>
        <Text style={styles.body}>
          Qualche domanda veloce per costruire il tuo primo piano di allenamento a corpo libero,
          pensato per casa e senza attrezzi. Il piano si adatterà nel tempo in base a come ti senti
          dopo ogni sessione.
        </Text>
        <Text style={styles.disclaimer}>
          Questa app propone esercizi a corpo libero a intensità accessibile e non sostituisce il
          parere di un medico o di un fisioterapista. Se hai dubbi sulla tua condizione fisica,
          consulta un professionista prima di iniziare.
        </Text>
      </View>
      <PrimaryButton label="Comincia" onPress={() => router.push('/onboarding/level')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
