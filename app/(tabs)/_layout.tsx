import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#669944', // Verde principal
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff', // Força fundo branco
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}>
      
      {/* 1. NOTÍCIAS (Esquerda) */}
   <Tabs.Screen
  name="home" // Mude de "index" para "home"
  options={{
    title: 'Notícias',
    tabBarIcon: ({ color }) => <MaterialIcons name="article" size={26} color={color} />,
  }}
/>

      {/* 2. CALENDÁRIO */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={26} color={color} />,
        }}
      />

      {/* 3. REGISTROS (Fica entre Calendário e Configurações) */}
      <Tabs.Screen
        name="records"
        options={{
          title: 'Registros',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={26} color={color} />,
        }}
      />

      {/* 4. CONFIGURAÇÕES (Extrema Direita) */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}