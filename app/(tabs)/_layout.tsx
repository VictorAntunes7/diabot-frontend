import { MaterialIcons } from '@expo/vector-icons';
import { Tabs, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Idioma, obterIdioma, traducoes } from '../../services/i18n';

const isNarrow = Platform.OS === 'web' && Dimensions.get('window').width < 500;

export default function TabLayout() {
  const [idioma, setIdioma] = useState<Idioma>('pt');

  useFocusEffect(
    useCallback(() => {
      obterIdioma().then(setIdioma);
    }, [])
  );

  const t = traducoes[idioma];
  const insets = useSafeAreaInsets();
  const bottomInset = isNarrow ? insets.bottom : 0;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: Platform.OS === 'ios' ? 88 : isNarrow ? 64 + bottomInset : Platform.OS === 'web' ? 60 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : isNarrow ? 10 + bottomInset : Platform.OS === 'web' ? 8 : 10,
          paddingTop: isNarrow ? 10 : 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarShowLabel: !isNarrow,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -4,
        },
      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: t.tabInicio,
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: t.tabCalendario,
          tabBarIcon: ({ color }) => <MaterialIcons name="event" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: t.tabRegistros,
          tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t.tabChat,
          tabBarIcon: ({ color }) => <MaterialIcons name="smart-toy" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tabAjustes,
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
