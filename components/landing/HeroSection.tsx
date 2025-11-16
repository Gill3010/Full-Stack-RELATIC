import { Image } from 'expo-image';
import React from 'react';
import { Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de la sección Hero (principal)
 * Primera impresión visual de la landing page
 * Incluye título, subtítulo, descripción y CTA
 * Responsive: se adapta a web desktop, web móvil y apps nativas
 */
export function HeroSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Breakpoint para móvil (web y nativo)
  return (
    <ThemedView style={[
      styles.container,
      {
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 32 : 48,
        paddingVertical: isMobile ? 40 : 64,
        paddingHorizontal: isMobile ? 24 : 48,
      },
    ]}>
      <View style={[
        styles.content,
        {
          flex: isMobile ? undefined : 1,
          maxWidth: isMobile ? '100%' : 600,
        },
      ]}>
        <ThemedText type="title" style={[
          styles.title,
          {
            fontSize: isMobile ? 32 : 48,
            lineHeight: isMobile ? 40 : 56,
          },
        ]}>
          Bienvenido a tu experiencia híbrida
        </ThemedText>
        <ThemedText style={[
          styles.subtitle,
          {
            fontSize: isMobile ? 18 : 20,
            lineHeight: isMobile ? 26 : 28,
          },
        ]}>
          En la web se siente como una página, en el móvil se siente como una app nativa.
        </ThemedText>
        <ThemedText style={[
          styles.description,
          {
            fontSize: isMobile ? 16 : 18,
            lineHeight: isMobile ? 24 : 28,
          },
        ]}>
          Ofrecemos soluciones innovadoras que se adaptan perfectamente a cualquier dispositivo,
          brindando una experiencia de usuario excepcional en todas las plataformas.
        </ThemedText>
        
        <View style={styles.ctaContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              {
                paddingHorizontal: isMobile ? 24 : 32,
                paddingVertical: isMobile ? 14 : 16,
              },
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Comenzar ahora">
            <ThemedText style={[
              styles.primaryButtonText,
              { fontSize: isMobile ? 15 : 16 },
            ]}>
              Comenzar ahora
            </ThemedText>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              {
                paddingHorizontal: isMobile ? 24 : 32,
                paddingVertical: isMobile ? 14 : 16,
              },
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Saber más">
            <ThemedText style={[
              styles.secondaryButtonText,
              { fontSize: isMobile ? 15 : 16 },
            ]}>
              Saber más
            </ThemedText>
          </Pressable>
        </View>
      </View>

      {/* Imagen de referencia - será reemplazada */}
      <View style={[
        styles.imageContainer,
        {
          flex: isMobile ? undefined : 1,
          height: isMobile ? 250 : 400,
        },
      ]}>
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
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    gap: 20,
  },
  title: {
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontWeight: '600',
    color: '#1e40af',
  },
  description: {
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
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#1e40af',
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
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

