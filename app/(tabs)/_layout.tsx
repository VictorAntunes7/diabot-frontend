import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones que já vem no Expo
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#669944', // Verde oficial do DIABot
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false, // Esconde o título no topo para usarmos o nosso personalizado
      }}>
      
      {/* Aba de Notícias (A primeira que aparece) */}
      <Tabs.Screen
        name="index" // O arquivo index.tsx agora será nossa Home/Notícias
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Aba de Calendário */}
      <Tabs.Screen
        name="explore" // Por enquanto mapeando para o arquivo que já existe
        options={{
          title: 'Calendário',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Aba de Registros */}
      <Tabs.Screen
        name="registros" // Criaremos este arquivo depois
        options={{
          title: 'Registros',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Aba de Configurações */}
      <Tabs.Screen
        name="settings" // Criaremos este arquivo depois
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}