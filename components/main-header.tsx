import React, { useState } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { NavLogo } from './navbar/NavLogo';
import { DesktopNav } from './navbar/DesktopNav';
import { MobileMenu } from './navbar/MobileMenu';
import { HamburgerButton } from './navbar/HamburgerButton';
import { SidebarNav } from './navbar/SidebarNav';
import { MobileSidebar } from './navbar/MobileSidebar';
import { WebSidebar } from './navbar/WebSidebar';

/**
 * Ítems de navegación del navbar
 * Se pueden extender fácilmente agregando más elementos
 */
const NAV_ITEMS = [
  'Inicio',
  'Servicios',
  'Nosotros',
  'Actividades',
  'Blog',
  'Regístrate',
];

/**
 * Componente principal del header/navbar
 * Responsive: se adapta automáticamente a web desktop, web móvil y apps nativas
 * 
 * Comportamiento:
 * - Web desktop (>= 768px): Sidebar colapsable siempre visible (íconos por defecto, expande con texto)
 * - Web móvil (< 768px): Logo + botón hamburguesa con menú desplegable
 * - Apps nativas: Logo + botón hamburguesa con sidebar lateral
 */
export function MainHeader() {
  const isWeb = Platform.OS === 'web';
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Punto de corte para diseño responsive
  // A partir de 768px mostramos sidebar colapsable
  const isDesktopWeb = isWeb && width >= 768;

  /**
   * Maneja la navegación cuando se presiona un ítem
   * TODO: Conectar con expo-router para navegación real
   */
  const handleItemPress = (item: string) => {
    console.log(`Navegando a: ${item}`);
    // Aquí se implementará la navegación real con expo-router
    // Ejemplo: router.push(`/${item.toLowerCase()}`);
  };

  // Renderizado para web desktop: Sidebar colapsable siempre visible
  if (isDesktopWeb) {
    return (
      <WebSidebar
        onItemPress={handleItemPress}
      />
    );
  }

  // Renderizado para web móvil y apps nativas
  const headerContent = (
    <ThemedView style={[styles.container, styles.nativeContainer]}>
      <NavLogo />
      {isWeb ? (
        // Web móvil: botón hamburguesa para menú desplegable
        <HamburgerButton
          isOpen={isMenuOpen}
          onPress={() => setIsMenuOpen((prev) => !prev)}
        />
      ) : (
        // Apps nativas: botón hamburguesa para abrir sidebar lateral
        <HamburgerButton
          isOpen={isMenuOpen}
          onPress={() => {
            console.log('Hamburger clicked, current state:', isMenuOpen);
            setIsMenuOpen((prev) => {
              console.log('Setting isMenuOpen to:', !prev);
              return !prev;
            });
          }}
        />
      )}
    </ThemedView>
  );

  return (
    <>
      {/* Header con SafeAreaView para móvil */}
      {isWeb ? (
        headerContent
      ) : (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          {headerContent}
        </SafeAreaView>
      )}

      {/* Menú desplegable para web móvil */}
      {isWeb && isMenuOpen && (
        <MobileMenu
          items={NAV_ITEMS}
          onItemPress={handleItemPress}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar lateral para apps nativas */}
      {!isWeb && (
        <MobileSidebar
          isOpen={isMenuOpen}
          onClose={() => {
            console.log('Closing sidebar');
            setIsMenuOpen(false);
          }}
          onItemPress={(item) => {
            handleItemPress(item);
            setIsMenuOpen(false);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    zIndex: 100,
  },
  container: {
    width: '100%',
    paddingHorizontal: Platform.select({
      web: 32,
      default: 20,
    }),
    paddingVertical: Platform.select({
      web: 20,
      default: 12,
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    minHeight: Platform.select({
      web: undefined,
      default: 50,
    }),
  },
  nativeContainer: {
    // Sin paddingTop adicional en móvil, SafeAreaView lo maneja
  },
  nativeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  hamburgerButtonWrapper: {
    padding: 4,
  },
});
