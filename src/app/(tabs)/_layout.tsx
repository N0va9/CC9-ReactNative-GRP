import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useThemeColors } from '@/hooks/useThemeColors';

export default function TabLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkCustom,
          borderTopColor: colors.whiteCustom,
        },
        tabBarActiveTintColor: colors.redCustom,
        tabBarInactiveTintColor: colors.whiteCustom,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='reload'
        options={{
          title: 'Actualiser',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='reload' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
