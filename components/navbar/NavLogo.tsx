import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

/**
 * Componente del logo del navbar
 * Muestra el nombre de la marca con un estilo profesional
 * Responsive: se adapta al tamaño de pantalla
 */
export function NavLogo() {
  return (
    <ThemedText
      type="title"
      style={styles.logo}
      lightColor="#1e40af"
      darkColor="#3b82f6">
      MiProyecto
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: '700',
    fontSize: Platform.select({
      web: 24,
      default: 20,
    }),
    letterSpacing: -0.5,
    // El color se maneja a través de lightColor/darkColor en ThemedText
  },
});

