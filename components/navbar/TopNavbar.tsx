import React from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface TopNavbarProps {
  /** Función que se ejecuta al presionar "Iniciar sesión" */
  onLoginPress?: () => void;
  /** Función que se ejecuta al presionar "Regístrate" */
  onRegisterPress?: () => void;
}

/**
 * Componente de navbar superior para web desktop
 * Muestra el logo/título a la izquierda y botones de acción a la derecha
 * Solo se muestra en web desktop (>= 768px)
 * Fondo azul institucional (#1e40af)
 */
export function TopNavbar({ onLoginPress, onRegisterPress }: TopNavbarProps) {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;

  // Solo renderizar en web desktop
  if (!isDesktopWeb) {
    return null;
  }

  const handleLogin = () => {
    if (onLoginPress) {
      onLoginPress();
    } else {
      console.log('Iniciar sesión');
      // TODO: Implementar navegación a página de login
    }
  };

  const handleRegister = () => {
    if (onRegisterPress) {
      onRegisterPress();
    } else {
      console.log('Regístrate');
      // TODO: Implementar navegación a página de registro
    }
  };

  return (
    <View
      // @ts-ignore - React Native Web soporta position fixed
      style={[
        styles.container,
        {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        },
      ]}>
      <View style={styles.content}>
        {/* Sección izquierda: Logo y subtítulo */}
        <View style={styles.leftSection}>
          <ThemedText style={styles.title}>RELATIC PANAMA</ThemedText>
          <ThemedText style={styles.subtitle}>
            red latinoamericana de investigaciones cualitativas
          </ThemedText>
        </View>

        {/* Sección derecha: Botones de acción */}
        <View style={styles.rightSection}>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Iniciar sesión">
            <ThemedText style={styles.loginButtonText}>Iniciar sesión</ThemedText>
          </Pressable>

          <Pressable
            onPress={handleRegister}
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Regístrate">
            <ThemedText style={styles.registerButtonText}>Regístrate</ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e40af',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 48,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 32, // Separación del borde derecho
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: 'transparent',
  },
  registerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
  },
});


