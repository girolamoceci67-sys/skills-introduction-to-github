import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme/theme';

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
  inner: {
    // "flexGrow: 1" invece di "flex: 1": un figlio diretto del contentContainer di una
    // ScrollView con "flex: 1" (che imposta flexBasis a 0) può misurarsi in modo instabile su
    // Android nativo, espandendosi oltre l'altezza reale del contenuto e lasciando grandi spazi
    // vuoti sotto le schermate con poco testo (es. Libreria). flexGrow si limita a riempire lo
    // spazio disponibile quando serve, senza quell'effetto.
    flexGrow: 1,
    padding: spacing.lg,
  },
});
