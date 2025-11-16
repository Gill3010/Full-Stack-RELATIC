import React from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de llamada a la acción (CTA)
 * Sección final para motivar al usuario a registrarse o contactar
 * Diseño con fondo degradado sutil y botones destacados
 * Responsive: se adapta a web desktop, web móvil y apps nativas
 */
export function CTASection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Breakpoint para móvil (web y nativo)

  return (
    <ThemedView style={[
      styles.container,
      {
        paddingVertical: isMobile ? 64 : 80,
        paddingHorizontal: isMobile ? 24 : 48,
      },
    ]}>
      <View style={styles.content}>
        <ThemedText type="title" style={[
          styles.title,
          { fontSize: isMobile ? 28 : 40 },
        ]}>
          ¿Listo para comenzar?
        </ThemedText>
        <ThemedText style={[
          styles.description,
          {
            fontSize: isMobile ? 16 : 18,
            lineHeight: isMobile ? 24 : 28,
          },
        ]}>
          Únete a nuestra comunidad y descubre todas las posibilidades que tenemos para ti.
          Regístrate ahora y obtén acceso exclusivo a nuestras herramientas y recursos.
        </ThemedText>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                paddingHorizontal: isMobile ? 32 : 40,
                paddingVertical: isMobile ? 16 : 18,
              },
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Registrarse ahora">
            <ThemedText style={[
              styles.primaryButtonText,
              { fontSize: isMobile ? 16 : 17 },
            ]}>
              Registrarse ahora
            </ThemedText>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                paddingHorizontal: isMobile ? 32 : 40,
                paddingVertical: isMobile ? 16 : 18,
              },
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Contactar">
            <ThemedText style={[
              styles.secondaryButtonText,
              { fontSize: isMobile ? 16 : 17 },
            ]}>
              Contactar
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    // Degradado sutil usando un overlay
    position: 'relative',
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 24,
    textAlign: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  description: {
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1e40af',
    borderRadius: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 6px 12px rgba(30, 64, 175, 0.3)',
      },
      default: {
        elevation: 4,
      },
    }),
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontWeight: '600',
    textAlign: 'center',
  },
});

