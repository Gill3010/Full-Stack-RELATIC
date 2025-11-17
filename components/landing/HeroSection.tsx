import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Componente para el degradado azul (solo web)
const GradientSection = ({ children, style }: { children: React.ReactNode; style?: any }) => {
  if (Platform.OS === 'web') {
    // Fusionar estilos correctamente
    const mergedStyle = Array.isArray(style) 
      ? Object.assign({}, ...style.filter(s => s))
      : style || {};
    
    return React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...mergedStyle,
      },
    }, children);
  }
  return <View style={[{ backgroundColor: '#1e40af' }, style]}>{children}</View>;
};

// Datos de los slides
const SLIDES = [
  {
    id: 1,
    title: 'Revistas Indexadas',
    subtitle: 'Publicación científica de alto impacto',
    description: 'Gestiona y publica revistas científicas indexadas utilizando Open Journal Systems (OJS). Publica artículos de investigación, gestiona el proceso de revisión por pares y aumenta la visibilidad de tus publicaciones académicas.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Carteles Digitales',
    subtitle: 'Difusión científica innovadora',
    description: 'Crea y publica carteles digitales de investigación mediante OJS. Presenta tus hallazgos científicos de manera visual y atractiva, facilitando la difusión del conocimiento académico en formato digital interactivo.',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c002ed6?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Libros Digitales',
    subtitle: 'Publicación académica especializada',
    description: 'Publica libros científicos y académicos en formato digital. Ofrecemos soluciones completas para la edición, publicación y distribución de obras académicas, facilitando el acceso al conocimiento científico.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Aprendizaje Continuo',
    subtitle: 'Plataforma educativa Moodle',
    description: 'Implementa y gestiona plataformas de aprendizaje continuo con Moodle. Crea cursos online, gestiona estudiantes, realiza evaluaciones y fomenta la educación continua en el ámbito académico y profesional.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Propiedad Intelectual',
    subtitle: 'Protección y gestión académica',
    description: 'Asesoría especializada en propiedad intelectual para investigadores y académicos. Protege tus publicaciones, patentes y trabajos de investigación, asegurando el reconocimiento adecuado de tu trabajo científico.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
];

/**
 * Componente de la sección Hero con carrusel
 * Carrusel con 5 slides sobre servicios académicos y científicos
 * Animación fade up + zoom in
 * Auto-play cada 5 segundos
 * Solo visible en web (móvil y desktop)
 */
export function HeroSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Valores animados para fade up + zoom in
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  // El componente ahora funciona en web y apps nativas

  // Función para cambiar de slide
  const goToSlide = React.useCallback((index: number) => {
    // Resetear animaciones
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
    translateYAnim.setValue(20);

    setCurrentIndex(index);

    // Animar entrada del nuevo slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, translateYAnim]);

  // Navegación
  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const next = (prevIndex + 1) % SLIDES.length;
      // Animar después de actualizar el estado
      requestAnimationFrame(() => {
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.8);
        translateYAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]).start();
      });
      return next;
    });
  }, [fadeAnim, scaleAnim, translateYAnim]);

  const prevSlide = () => {
    const prev = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    goToSlide(prev);
  };

  const goToSlideIndex = (index: number) => {
    goToSlide(index);
  };

  // Auto-play
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Inicializar animación del primer slide
  useEffect(() => {
    goToSlide(0);
  }, []);

  const currentSlide = SLIDES[currentIndex];
  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { scale: scaleAnim },
      { translateY: translateYAnim },
    ],
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingVertical: isMobile ? 40 : 64,
          paddingHorizontal: isMobile ? 16 : 48,
          ...Platform.select({
            web: {
              boxSizing: 'border-box',
            },
          }),
        },
      ]}
      {...(Platform.OS === 'web' && {
        // @ts-ignore - React Native Web soporta onMouseEnter/onMouseLeave
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
      })}>
      {/* Contenedor principal con degradado e imagen unificados */}
      <View style={styles.slideWrapper}>
        <Animated.View
          style={[
            styles.slideContainer,
            animatedStyle,
            {
              height: isMobile ? 'auto' : 500,
              flexDirection: isMobile ? 'column' : 'row',
            },
          ]}>
        {/* Sección izquierda con degradado azul y contenido */}
        <GradientSection
          style={[
            styles.gradientSection,
            {
              width: isMobile ? '100%' : '42%',
              padding: isMobile ? 24 : 48,
              paddingHorizontal: isMobile ? 24 : 48,
              minHeight: isMobile ? 400 : '100%',
              ...Platform.select({
                web: {
                  boxSizing: 'border-box',
                },
              }),
            },
          ]}>
          <ThemedText type="title" style={[
            styles.title,
            {
              fontSize: isMobile ? 32 : 48,
              lineHeight: isMobile ? 40 : 56,
            },
          ]}>
            {currentSlide.title}
          </ThemedText>
          <ThemedText style={[
            styles.subtitle,
            {
              fontSize: isMobile ? 18 : 20,
              lineHeight: isMobile ? 26 : 28,
            },
          ]}>
            {currentSlide.subtitle}
          </ThemedText>
          <ThemedText style={[
            styles.description,
            {
              fontSize: isMobile ? 16 : 18,
              lineHeight: isMobile ? 24 : 28,
            },
          ]}>
            {currentSlide.description}
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
        </GradientSection>

        {/* Sección derecha con imagen */}
        <View
          style={[
            styles.imageSection,
            {
              width: isMobile ? '100%' : '58%',
              height: isMobile ? 300 : '100%',
            },
          ]}>
          <Image
            source={{ uri: currentSlide.image }}
            style={styles.heroImage}
            contentFit="cover"
            transition={200}
            placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
          />
        </View>
        </Animated.View>
      </View>

      {/* Controles de navegación - Flechas */}
      {!isMobile && (
        <>
          <Pressable
            style={[styles.navButton, styles.prevButton]}
            onPress={prevSlide}
            accessibilityRole="button"
            accessibilityLabel="Slide anterior">
            <ThemedText style={styles.navButtonText}>‹</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.navButton, styles.nextButton]}
            onPress={nextSlide}
            accessibilityRole="button"
            accessibilityLabel="Slide siguiente">
            <ThemedText style={styles.navButtonText}>›</ThemedText>
          </Pressable>
        </>
      )}

      {/* Indicadores de puntos */}
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
            onPress={() => goToSlideIndex(index)}
            accessibilityRole="button"
            accessibilityLabel={`Ir al slide ${index + 1}`}
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    ...Platform.select({
      web: {
        position: 'relative',
      },
    }),
  },
  slideWrapper: {
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
    position: 'relative',
  },
  slideContainer: {
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
      default: {
        elevation: 8,
      },
    }),
  },
  gradientSection: {
    justifyContent: 'center',
    backgroundColor: '#1e40af',
    ...Platform.select({
      web: {
        // El backgroundImage se aplica inline para mejor compatibilidad
      },
    }),
  },
  title: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 12,
    ...Platform.select({
      web: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
      },
    }),
  },
  subtitle: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 16,
    ...Platform.select({
      web: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
      },
    }),
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    marginBottom: 24,
    ...Platform.select({
      web: {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
      },
    }),
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
    flexWrap: 'wrap',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: '100%',
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: '#f3f4f6',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
        },
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
    borderColor: '#ffffff',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-2px)',
        },
      },
    }),
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#1e40af',
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  imageSection: {
    overflow: 'hidden',
    ...Platform.select({
      web: {
        display: 'flex',
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        objectFit: 'cover',
        display: 'block',
      },
    }),
  },
  // Controles de navegación
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: '#1e40af',
          transform: 'scale(1.1)',
        },
      },
      default: {
        elevation: 4,
      },
    }),
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  navButtonText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e40af',
    lineHeight: 32,
    ...Platform.select({
      web: {
        transition: 'color 0.3s ease',
      },
    }),
  },
  // Indicadores de puntos
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#cbd5e1',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: '#94a3b8',
          transform: 'scale(1.2)',
        },
      },
    }),
  },
  dotActive: {
    width: 32,
    backgroundColor: '#1e40af',
    ...Platform.select({
      web: {
        ':hover': {
          backgroundColor: '#1e3a8a',
        },
      },
    }),
  },
});

