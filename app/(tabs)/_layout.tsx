import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Layout de tabs para la aplicación
 * En móvil: muestra solo "Inicio" y "Regístrate" en la barra inferior
 * En web: oculta la barra de tabs
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // En web ocultamos la barra de pestañas inferior; en móvil se muestra con 2 opciones.
        tabBarStyle:
          Platform.OS === 'web'
            ? { display: 'none' }
            : undefined,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Regístrate',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-add" size={28} color={color} />
          ),
        }}
      />
      {/* Ocultar explore en la barra de tabs pero mantener la ruta disponible */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Oculta de la barra de tabs pero mantiene la ruta
        }}
      />
    </Tabs>
  );
}
