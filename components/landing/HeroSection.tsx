import { Image } from 'expo-image';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de la sección Hero (principal)
 * Primera impresión visual de la landing page
 * Incluye título, subtítulo, descripción y CTA
 */
export function HeroSection() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Bienvenido a tu experiencia híbrida
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          En la web se siente como una página, en el móvil se siente como una app nativa.
        </ThemedText>
        <ThemedText style={styles.description}>
          Ofrecemos soluciones innovadoras que se adaptan perfectamente a cualquier dispositivo,
          brindando una experiencia de usuario excepcional en todas las plataformas.
        </ThemedText>
        
        <View style={styles.ctaContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Comenzar ahora">
            <ThemedText style={styles.primaryButtonText}>Comenzar ahora</ThemedText>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Saber más">
            <ThemedText style={styles.secondaryButtonText}>Saber más</ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Imagen de referencia - será reemplazada */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' }}
          style={styles.heroImage}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }),
    alignItems: 'center',
    gap: Platform.select({
      web: 48,
      default: 32,
    }),
    paddingVertical: Platform.select({
      web: 64,
      default: 40,
    }),
    paddingHorizontal: Platform.select({
      web: 48,
      default: 24,
    }),
    backgroundColor: '#ffffff',
  },
  content: {
    flex: Platform.select({
      web: 1,
      default: undefined,
    }),
    gap: 20,
    maxWidth: Platform.select({
      web: 600,
      default: '100%',
    }),
  },
  title: {
    fontSize: Platform.select({
      web: 48,
      default: 32,
    }),
    fontWeight: '700',
    lineHeight: Platform.select({
      web: 56,
      default: 40,
    }),
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Platform.select({
      web: 20,
      default: 18,
    }),
    fontWeight: '600',
    color: '#1e40af',
    lineHeight: Platform.select({
      web: 28,
      default: 26,
    }),
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
    marginTop: 8,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: Platform.select({
      web: 32,
      default: 24,
    }),
    paddingVertical: Platform.select({
      web: 16,
      default: 14,
    }),
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(30, 64, 175, 0.2)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: Platform.select({
      web: 32,
      default: 24,
    }),
    paddingVertical: Platform.select({
      web: 16,
      default: 14,
    }),
    borderRadius: 8,
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
      web: 16,
      default: 15,
    }),
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontSize: Platform.select({
      web: 16,
      default: 15,
    }),
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    flex: Platform.select({
      web: 1,
      default: undefined,
    }),
    width: Platform.select({
      web: '100%',
      default: '100%',
    }),
    height: Platform.select({
      web: 400,
      default: 250,
    }),
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      default: {
        elevation: 4,
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
});

