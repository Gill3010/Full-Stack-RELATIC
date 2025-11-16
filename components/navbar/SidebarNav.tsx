import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { HamburgerButton } from './HamburgerButton';
import { NavItem } from './NavItem';
import { NavLogo } from './NavLogo';

interface SidebarNavProps {
  /** Array de ítems del menú */
  items: string[];
  /** Función que se ejecuta al seleccionar un ítem */
  onItemPress: (item: string) => void;
  /** Estado del sidebar (abierto/cerrado) */
  isOpen: boolean;
  /** Función para abrir/cerrar el sidebar */
  onToggle: () => void;
  /** Ítem actualmente activo */
  activeItem?: string;
}

/**
 * Componente de navbar lateral para web
 * Se muestra en el lado izquierdo de la pantalla
 * Se abre/cierra con un botón hamburguesa en la parte superior
 * Diseño moderno y profesional
 */
export function SidebarNav({
  items,
  onItemPress,
  isOpen,
  onToggle,
  activeItem,
}: SidebarNavProps) {
  // Solo renderizar en web
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <>
      {/* Botón hamburguesa fijo en la parte superior izquierda */}
      <View
        // @ts-ignore - React Native Web soporta position fixed
        style={[
          styles.hamburgerButtonContainer,
          {
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1001,
          },
        ]}>
        <Pressable
          onPress={onToggle}
          style={({ pressed }) => [
            styles.hamburgerButton,
            pressed && styles.hamburgerButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={isOpen ? 'Cerrar menú' : 'Abrir menú'}>
          <HamburgerButton isOpen={isOpen} onPress={onToggle} />
        </Pressable>
      </View>

      {/* Overlay oscuro cuando el sidebar está abierto */}
      {isOpen && (
        <Pressable
          // @ts-ignore - React Native Web soporta position fixed
          style={[
            styles.overlay,
            {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            },
          ]}
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel="Cerrar menú"
        />
      )}

      {/* Sidebar lateral */}
      <ThemedView
        // @ts-ignore - React Native Web soporta position fixed y transform
        style={[
          styles.sidebar,
          {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: 280,
            zIndex: 1000,
            transform: [{ translateX: isOpen ? 0 : -280 }],
            // Transición suave para web
            transition: 'transform 0.3s ease-in-out',
          },
        ]}>
        {/* Logo en la parte superior del sidebar */}
        <View style={styles.sidebarHeader}>
          <NavLogo />
        </View>

        {/* Lista de ítems de navegación */}
        <View style={styles.navItemsContainer}>
          {items.map((item) => (
            <View key={item} style={styles.navItemWrapper}>
              <NavItem
                label={item}
                onPress={() => {
                  onItemPress(item);
                }}
                isActive={activeItem === item}
                isSpecial={item === 'Regístrate'}
              />
            </View>
          ))}
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButtonContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  hamburgerButton: {
    padding: 4,
  },
  hamburgerButtonPressed: {
    opacity: 0.7,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    backgroundColor: '#ffffff',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  sidebarHeader: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  navItemsContainer: {
    gap: 8,
  },
  navItemWrapper: {
    width: '100%',
  },
});
