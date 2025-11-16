import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface HamburgerButtonProps {
  /** Estado del menú (abierto/cerrado) */
  isOpen: boolean;
  /** Función que se ejecuta al presionar el botón */
  onPress: () => void;
}

/**
 * Componente del botón hamburguesa para menú móvil
 * Muestra tres líneas que se animan al abrir/cerrar
 * Accesible con etiquetas ARIA
 */
export function HamburgerButton({ isOpen, onPress }: HamburgerButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      accessibilityState={{ expanded: isOpen }}>
      <View style={[styles.line, isOpen && styles.lineOpen1]} />
      <View style={[styles.line, isOpen && styles.lineOpen2]} />
      <View style={[styles.line, isOpen && styles.lineOpen3]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 24,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  line: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1f2937',
    width: '100%',
    // Las animaciones se pueden agregar con Animated API si se requiere
  },
  lineOpen1: {
    transform: [{ rotate: '45deg' }, { translateY: 8.5 }],
  },
  lineOpen2: {
    opacity: 0,
  },
  lineOpen3: {
    transform: [{ rotate: '-45deg' }, { translateY: -8.5 }],
  },
});

