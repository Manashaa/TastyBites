// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: () => <Text>🏠</Text> }} />
      <Tabs.Screen name="categories" options={{ title: 'Categories', tabBarIcon: () => <Text>📂</Text> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: () => <Text>❤️</Text> }} />
    </Tabs>
  );
}
