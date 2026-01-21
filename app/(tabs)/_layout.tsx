import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native'; // Importe o Platform para ajustes específicos

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#669944', // Verde do DIABot
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        
        // --- AJUSTE DE ESPAÇAMENTO AQUI ---
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 65, // Mais alto no iPhone
          paddingBottom: Platform.OS === 'ios' ? 30 : 10, // Sobe os ícones e nomes
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notícias',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="article" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" size={26} color={color} />
          ),
        }}
      />

      {/* Exemplo de como ficaria a aba de registros no futuro */}
      <Tabs.Screen
        name="records"
        options={{
          title: 'Registros',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}