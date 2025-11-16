import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NavLogo } from './NavLogo';

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

interface MobileSidebarProps {
  /** Estado del sidebar (abierto/cerrado) */
  isOpen: boolean;
  /** Función para cerrar el sidebar */
  onClose: () => void;
  /** Función que se ejecuta al seleccionar un ítem */
  onItemPress: (item: string) => void;
}

/**
 * Componente de sidebar lateral para apps móviles nativas
 * Se desliza desde la izquierda con las 6 opciones completas del menú
 * Solo se muestra en apps nativas (iOS/Android), no en web
 */
export function MobileSidebar({ isOpen, onClose, onItemPress }: MobileSidebarProps) {
  // Solo renderizar en apps nativas
  if (Platform.OS === 'web') {
    return null;
  }

  const [isMounted, setIsMounted] = useState(false);

  // Animación para el sidebar
  const slideAnim = useRef(new Animated.Value(-280)).current;

  useEffect(() => {
    if (isOpen) {
      // Montar el componente antes de animar
      setIsMounted(true);
      // Pequeño delay para asegurar que el componente esté montado
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 10);
    } else {
      Animated.timing(slideAnim, {
        toValue: -280,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsMounted(false);
      });
    }
  }, [isOpen, slideAnim]);

  // Animación para el overlay
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, overlayOpacity]);

  // No renderizar si no está montado
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Overlay oscuro para cerrar el sidebar */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
            pointerEvents: isOpen ? 'auto' : 'none',
          },
        ]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Cerrar menú"
          disabled={!isOpen}
        />
      </Animated.View>

      {/* Sidebar lateral */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}>
        <ThemedView style={styles.sidebarContent}>
        {/* Header del sidebar con logo */}
        <View style={styles.sidebarHeader}>
          <NavLogo />
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar menú">
            <MaterialIcons name="close" size={24} color="#1f2937" />
          </Pressable>
        </View>

        {/* Título de la sección */}
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            Navegación rápida
          </ThemedText>
        </View>

        {/* Lista de ítems del menú */}
        <View style={styles.menuItemsContainer}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => {
                onItemPress(item.label);
                onClose();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                item.label === 'Regístrate' && styles.specialMenuItem,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Navegar a ${item.label}`}>
              <View style={styles.menuItemContent}>
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={item.label === 'Regístrate' ? '#ffffff' : '#1e40af'}
                  style={styles.menuItemIcon}
                />
                <ThemedText
                  style={[
                    styles.menuItemText,
                    item.label === 'Regístrate' && styles.specialMenuItemText,
                  ]}>
                  {item.label}
                </ThemedText>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={item.label === 'Regístrate' ? '#ffffff' : '#9ca3af'}
              />
            </Pressable>
          ))}
        </View>
        </ThemedView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    zIndex: 10000,
    // Sombra para el sidebar
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  sidebarContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuItemsContainer: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    marginBottom: 4,
  },
  menuItemPressed: {
    opacity: 0.7,
    backgroundColor: '#f3f4f6',
  },
  specialMenuItem: {
    backgroundColor: '#1e40af',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  specialMenuItemText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

