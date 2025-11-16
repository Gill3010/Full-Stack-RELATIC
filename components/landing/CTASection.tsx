import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de llamada a la acción (CTA)
 * Sección final para motivar al usuario a registrarse o contactar
 * Diseño con fondo degradado sutil y botones destacados
 */
export function CTASection() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          ¿Listo para comenzar?
        </ThemedText>
        <ThemedText style={styles.description}>
          Únete a nuestra comunidad y descubre todas las posibilidades que tenemos para ti.
          Regístrate ahora y obtén acceso exclusivo a nuestras herramientas y recursos.
        </ThemedText>
        
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Registrarse ahora">
            <ThemedText style={styles.primaryButtonText}>Registrarse ahora</ThemedText>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Contactar">
            <ThemedText style={styles.secondaryButtonText}>Contactar</ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.select({
      web: 80,
      default: 64,
    }),
    paddingHorizontal: Platform.select({
      web: 48,
      default: 24,
    }),
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
    fontSize: Platform.select({
      web: 40,
      default: 28,
    }),
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  description: {
    fontSize: Platform.select({
      web: 18,
      default: 16,
    }),
    lineHeight: Platform.select({
      web: 28,
      default: 24,
    }),
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
    paddingHorizontal: Platform.select({
      web: 40,
      default: 32,
    }),
    paddingVertical: Platform.select({
      web: 18,
      default: 16,
    }),
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
    paddingHorizontal: Platform.select({
      web: 40,
      default: 32,
    }),
    paddingVertical: Platform.select({
      web: 18,
      default: 16,
    }),
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
    fontSize: Platform.select({
      web: 17,
      default: 16,
    }),
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontSize: Platform.select({
      web: 17,
      default: 16,
    }),
    fontWeight: '600',
    textAlign: 'center',
  },
});

