import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Configuración de ítems del menú con sus íconos correspondientes
 */
const MENU_ITEMS = [
  { label: 'Inicio', icon: 'home' as const },
  { label: 'Servicios', icon: 'business-center' as const },
  { label: 'Nosotros', icon: 'people' as const },
  { label: 'Actividades', icon: 'event' as const },
  { label: 'Blog', icon: 'article' as const },
  { label: 'Regístrate', icon: 'person-add' as const },
];

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
 * Incluye íconos y textos para mejor UX
 */
export function MobileMenu({ items, onItemPress, onClose }: MobileMenuProps) {
  // Función para obtener el ícono correspondiente a un ítem
  const getIconForItem = (itemLabel: string) => {
    const menuItem = MENU_ITEMS.find((item) => item.label === itemLabel);
    return menuItem?.icon || 'circle';
  };

  return (
    <ThemedView style={styles.container}>
      {items.map((item) => {
        const icon = getIconForItem(item);
        const isSpecial = item === 'Regístrate';

        return (
          <Pressable
            key={item}
            onPress={() => {
              onItemPress(item);
              onClose();
            }}
            style={({ pressed }) => [
              styles.menuItem,
              isSpecial && styles.specialMenuItem,
              pressed && styles.menuItemPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Navegar a ${item}`}>
            <View style={styles.menuItemContent}>
              <MaterialIcons
                name={icon}
                size={24}
                color={isSpecial ? '#ffffff' : '#1f2937'}
              />
              <ThemedText
                style={[
                  styles.menuItemText,
                  isSpecial && styles.specialMenuItemText,
                ]}>
                {item}
              </ThemedText>
            </View>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  specialMenuItem: {
    backgroundColor: '#1e40af',
    marginTop: 8,
  },
  specialMenuItemText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  menuItemPressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
  },
});

