import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface NavItemProps {
  /** Texto del ítem de navegación */
  label: string;
  /** Función que se ejecuta al presionar el ítem */
  onPress: () => void;
  /** Indica si el ítem está activo/seleccionado */
  isActive?: boolean;
  /** Indica si es un ítem especial (ej: botón de registro) */
  isSpecial?: boolean;
}

/**
 * Componente individual para cada ítem del navbar
 * Maneja estados de hover y pressed con feedback visual
 * Soporta estilos especiales para botones destacados
 */
export function NavItem({ label, onPress, isActive = false, isSpecial = false }: NavItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isSpecial && styles.specialContainer,
        pressed && styles.pressed,
        isActive && styles.active,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Navegar a ${label}`}>
      <ThemedText
        style={[
          styles.text,
          isSpecial && styles.specialText,
          isActive && styles.activeText,
        ]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.select({
      web: 12,
      default: 12,
    }),
    paddingHorizontal: Platform.select({
      web: 12,
      default: 12,
    }),
    borderRadius: 6,
    // Ancho completo para mejor usabilidad
    width: '100%',
  },
  specialContainer: {
    backgroundColor: '#1e40af',
    paddingHorizontal: Platform.select({
      web: 20,
      default: 16,
    }),
    paddingVertical: Platform.select({
      web: 10,
      default: 12,
    }),
    borderRadius: 8,
    // Sombra sutil para el botón especial
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(30, 64, 175, 0.2)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  active: {
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
  },
  text: {
    fontSize: Platform.select({
      web: 15,
      default: 16,
    }),
    fontWeight: '500',
    color: '#1f2937',
    letterSpacing: 0.2,
  },
  specialText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activeText: {
    color: '#1e40af',
    fontWeight: '600',
  },
});

