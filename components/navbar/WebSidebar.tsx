import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSidebar } from './SidebarContext';
import { Tooltip } from './Tooltip';

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

interface WebSidebarProps {
  /** Función que se ejecuta al seleccionar un ítem */
  onItemPress: (item: string) => void;
  /** Ítem actualmente activo */
  activeItem?: string;
}

/**
 * Componente de sidebar colapsable para web
 * - Estado colapsado: muestra solo íconos (72px de ancho)
 * - Estado expandido: muestra íconos + texto (260px de ancho)
 * - Hace push del contenido (no overlay)
 * - Muestra overlay oscuro cuando está expandido
 */
export function WebSidebar({ onItemPress, activeItem }: WebSidebarProps) {
  // Solo renderizar en web
  if (Platform.OS !== 'web') {
    return null;
  }

  const { isExpanded, setIsExpanded, sidebarWidth } = useSidebar();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Overlay oscuro cuando está expandido */}
      {isExpanded && (
        <Pressable
          // @ts-ignore - React Native Web soporta position fixed
          style={[
            styles.overlay,
            {
              position: 'fixed',
              top: 0,
              left: sidebarWidth,
              right: 0,
              bottom: 0,
              zIndex: 998,
            },
          ]}
          onPress={handleToggle}
          accessibilityRole="button"
          accessibilityLabel="Cerrar menú"
        />
      )}

      {/* Sidebar lateral - siempre visible */}
      <ThemedView
        // @ts-ignore - React Native Web soporta position fixed
        style={[
          styles.sidebar,
          {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: sidebarWidth,
            zIndex: 1000,
            transition: 'width 0.3s ease-in-out',
          },
        ]}>
        {/* Header del sidebar con logo/hamburguesa */}
        <Pressable
          onPress={handleToggle}
          style={styles.sidebarHeader}
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? 'Colapsar menú' : 'Expandir menú'}>
          <View style={styles.headerContent}>
            {isExpanded ? (
              <>
                <ThemedText type="title" style={styles.logo}>
                  MiProyecto
                </ThemedText>
                <MaterialIcons name="menu" size={24} color="#1f2937" />
              </>
            ) : (
              <MaterialIcons name="menu" size={28} color="#1e40af" />
            )}
          </View>
        </Pressable>

        {/* Lista de ítems del menú */}
        <View style={styles.menuItemsContainer}>
          {MENU_ITEMS.map((item) => (
            <MenuItemWithTooltip
              key={item.label}
              item={item}
              isExpanded={isExpanded}
              isActive={activeItem === item.label}
              onPress={() => onItemPress(item.label)}
            />
          ))}
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 0.3s ease-in-out',
  },
  sidebar: {
    backgroundColor: '#ffffff',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    paddingTop: 20,
    paddingHorizontal: 0,
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e40af',
    letterSpacing: -0.5,
  },
  menuItemsContainer: {
    gap: 4,
    paddingHorizontal: 8,
  },
  menuItemWrapper: {
    position: 'relative',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
    minHeight: 48,
  },
  menuItemPressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
  },
  menuItemActive: {
    backgroundColor: 'rgba(30, 64, 175, 0.1)',
  },
  specialMenuItem: {
    backgroundColor: '#1e40af',
    marginTop: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  menuItemIcon: {
    minWidth: 24,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  specialMenuItemText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  menuItemTextActive: {
    color: '#1e40af',
    fontWeight: '600',
  },
});

/**
 * Componente de ítem del menú con tooltip
 * Muestra tooltip cuando el sidebar está colapsado y el usuario pasa el mouse
 */
interface MenuItemWithTooltipProps {
  item: { label: string; icon: string };
  isExpanded: boolean;
  isActive: boolean;
  onPress: () => void;
}

function MenuItemWithTooltip({
  item,
  isExpanded,
  isActive,
  onPress,
}: MenuItemWithTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Solo mostrar tooltip cuando está colapsado y el mouse está sobre el ítem
  const showTooltip = !isExpanded && isHovered;

  return (
    <View
      style={styles.menuItemWrapper}
      // @ts-ignore - React Native Web soporta eventos de mouse en View
      onMouseEnter={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onMouseLeave={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
          isActive && styles.menuItemActive,
          item.label === 'Regístrate' && styles.specialMenuItem,
        ]}
        accessibilityRole="button"
        accessibilityLabel={item.label}>
        <View style={styles.menuItemContent}>
          <MaterialIcons
            name={item.icon as any}
            size={24}
            color={
              item.label === 'Regístrate'
                ? '#ffffff'
                : isActive
                ? '#1e40af'
                : '#6b7280'
            }
            style={styles.menuItemIcon}
          />
          {isExpanded && (
            <ThemedText
              style={[
                styles.menuItemText,
                item.label === 'Regístrate' && styles.specialMenuItemText,
                isActive && styles.menuItemTextActive,
              ]}>
              {item.label}
            </ThemedText>
          )}
        </View>
      </Pressable>
      {/* Tooltip que se muestra cuando está colapsado */}
      {Platform.OS === 'web' && <Tooltip text={item.label} show={showTooltip} />}
    </View>
  );
}

