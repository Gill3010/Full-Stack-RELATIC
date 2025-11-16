import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { NavItem } from './NavItem';

interface MobileMenuProps {
  /** Array de ítems del menú */
  items: string[];
  /** Función que se ejecuta al seleccionar un ítem */
  onItemPress: (item: string) => void;
  /** Función para cerrar el menú */
  onClose: () => void;
}

/**
 * Componente del menú móvil desplegable
 * Se muestra en pantallas pequeñas y web móvil
 * Incluye animación de entrada y fondo semitransparente opcional
 */
export function MobileMenu({ items, onItemPress, onClose }: MobileMenuProps) {
  return (
    <ThemedView style={styles.container}>
      {items.map((item) => (
        <View key={item} style={styles.itemWrapper}>
          <NavItem
            label={item}
            onPress={() => {
              onItemPress(item);
              onClose();
            }}
            isSpecial={item === 'Regístrate'}
          />
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    // Sombra sutil para el menú desplegable
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  itemWrapper: {
    width: '100%',
  },
});

