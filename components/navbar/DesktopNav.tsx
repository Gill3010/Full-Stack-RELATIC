import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavItem } from './NavItem';

interface DesktopNavProps {
  /** Array de ítems del menú */
  items: string[];
  /** Función que se ejecuta al seleccionar un ítem */
  onItemPress: (item: string) => void;
  /** Ítem actualmente activo */
  activeItem?: string;
}

/**
 * Componente de navegación para escritorio
 * Muestra todos los ítems en una fila horizontal
 * Optimizado para pantallas grandes (>= 768px)
 */
export function DesktopNav({ items, onItemPress, activeItem }: DesktopNavProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <NavItem
          key={item}
          label={item}
          onPress={() => onItemPress(item)}
          isActive={activeItem === item}
          isSpecial={item === 'Regístrate'}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
});

