import { useEffect } from 'react';
import { Stack } from 'expo-router';

import { useGymSession } from '../../src/gym/gymSession';
import { colors } from '../../src/theme/theme';

export default function GymLayout() {
  const status = useGymSession((state) => state.status);
  const refresh = useGymSession((state) => state.refresh);

  // La sessione Supabase persiste tra un riavvio e l'altro, ma questo store (in memoria) no: se
  // l'app si riapre direttamente su una schermata figlia (es. l'ultima aperta prima di chiudere),
  // senza passare da /gym/index, va comunque ricaricato qui — altrimenti profile/gym restano null
  // per sempre e le schermate figlie restano bloccate sullo spinner di caricamento.
  useEffect(() => {
    if (status === 'unknown') {
      refresh();
    }
  }, [status, refresh]);

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
