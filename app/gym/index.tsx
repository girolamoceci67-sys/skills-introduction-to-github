import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';

import { useGymSession } from '../../src/gym/gymSession';
import { colors } from '../../src/theme/theme';

/** Router puro: smista al login, alla dashboard master o alla vista iscritto in base al profilo attivo. */
export default function GymIndex() {
  const status = useGymSession((state) => state.status);
  const role = useGymSession((state) => state.profile?.role ?? null);
  const refresh = useGymSession((state) => state.refresh);

  useEffect(() => {
    if (status === 'unknown') {
      refresh();
    }
  }, [status, refresh]);

  if (status === 'unknown') {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (status === 'signed_out') {
    return <Redirect href="/gym/login" />;
  }

  return <Redirect href={role === 'master' ? '/gym/master' : '/gym/member'} />;
}
