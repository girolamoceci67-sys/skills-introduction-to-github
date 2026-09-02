import { Stack } from 'expo-router';

import { colors } from '../../src/theme/theme';

export default function GymLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerBackTitle: '',
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="create" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="master/index" options={{ title: 'Gestione palestra' }} />
      <Stack.Screen name="master/new-member" options={{ title: 'Nuovo iscritto' }} />
      <Stack.Screen name="master/exercises" options={{ title: 'Esercizi personalizzati' }} />
      <Stack.Screen name="master/member/[memberId]" options={{ title: 'Piano iscritto' }} />
      <Stack.Screen name="member/index" options={{ title: 'Il mio piano' }} />
      <Stack.Screen name="session/index" options={{ title: 'Allenamento', gestureEnabled: false }} />
    </Stack>
  );
}
