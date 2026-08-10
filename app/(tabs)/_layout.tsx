import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { colors } from '../../src/theme/theme';

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }} accessibilityElementsHidden>
      {symbol}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon symbol="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Libreria',
          tabBarIcon: ({ focused }) => <TabIcon symbol="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progressi',
          tabBarIcon: ({ focused }) => <TabIcon symbol="📈" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
