import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface TopNavbarProps {
  /** Función que se ejecuta al presionar "Iniciar sesión" */
  onLoginPress?: () => void;
  /** Función que se ejecuta al presionar "Regístrate" */
  onRegisterPress?: () => void;
  /** Posición Y del scroll (opcional, se detecta automáticamente si no se proporciona) */
  scrollY?: number;
}

/**
 * Componente de navbar superior para web desktop
 * Muestra el logo/título a la izquierda y botones de acción a la derecha
 * Solo se muestra en web desktop (>= 768px)
 * Fondo azul institucional (#1e40af)
 */
export function TopNavbar({ onLoginPress, onRegisterPress, scrollY }: TopNavbarProps) {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll - usar scrollY prop si está disponible, sino detectar automáticamente
  // IMPORTANTE: Este hook debe ejecutarse siempre, antes de cualquier return condicional
  useEffect(() => {
    // Solo procesar si es web desktop
    if (!isDesktopWeb) {
      return;
    }

    // Si se proporciona scrollY como prop, usarlo directamente
    if (scrollY !== undefined) {
      setIsScrolled(scrollY > 50);
      return;
    }

    // Si no se proporciona, detectar automáticamente (solo en web)
    if (Platform.OS !== 'web') {
      return;
    }

    const handleScroll = () => {
      let currentScrollY = 0;
      
      if (typeof window !== 'undefined') {
        currentScrollY = window.scrollY || window.pageYOffset || 0;
      }
      
      if (currentScrollY === 0 && typeof document !== 'undefined') {
        currentScrollY = document.documentElement?.scrollTop || 
                        document.body?.scrollTop || 
                        0;
      }

      setIsScrolled(currentScrollY > 50);
    };

    // Agregar listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Verificar estado inicial
    handleScroll();

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollY, isDesktopWeb]);

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

  // Colores según el estado
  const backgroundColor = isScrolled ? '#ffffff' : '#1e40af';
  const borderBottomColor = isScrolled ? '#1e40af' : '#ffffff';
  const titleColor = isScrolled ? '#1f2937' : '#ffffff';
  const subtitleColor = isScrolled ? '#6b7280' : 'rgba(255, 255, 255, 0.9)';

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
          backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor,
          ...Platform.select({
            web: {
              transition: 'background-color 0.3s ease, border-bottom-color 0.3s ease',
            },
          }),
        },
      ]}>
      <View style={styles.content}>
        {/* Sección izquierda: Logo y subtítulo */}
        <View style={styles.leftSection}>
          <ThemedText style={[styles.title, { color: titleColor }]}>
            RELATIC PANAMA
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: subtitleColor }]}>
            red latinoamericana de investigaciones cualitativas
          </ThemedText>
        </View>

        {/* Sección derecha: Botones de acción */}
        <View style={styles.rightSection}>
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              isScrolled && styles.loginButtonScrolled,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Iniciar sesión">
            <ThemedText style={[
              styles.loginButtonText,
              isScrolled && styles.loginButtonTextScrolled,
            ]}>
              Iniciar sesión
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={handleRegister}
            style={({ pressed }) => [
              styles.registerButton,
              isScrolled && styles.registerButtonScrolled,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Regístrate">
            <ThemedText style={[
              styles.registerButtonText,
              isScrolled && styles.registerButtonTextScrolled,
            ]}>
              Regístrate
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 48,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
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
    ...Platform.select({
      web: {
        transition: 'all 0.3s ease',
      },
    }),
  },
  loginButtonScrolled: {
    borderColor: '#1e40af',
    ...Platform.select({
      web: {
        ':hover': {
          backgroundColor: '#f3f4f6',
        },
      },
    }),
  },
  registerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  registerButtonScrolled: {
    backgroundColor: '#1e40af',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(30, 64, 175, 0.3)',
        ':hover': {
          backgroundColor: '#1e3a8a',
        },
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
    ...Platform.select({
      web: {
        transition: 'color 0.3s ease',
      },
    }),
  },
  loginButtonTextScrolled: {
    color: '#1e40af',
  },
  registerButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    ...Platform.select({
      web: {
        transition: 'color 0.3s ease',
      },
    }),
  },
  registerButtonTextScrolled: {
    color: '#ffffff',
  },
});


