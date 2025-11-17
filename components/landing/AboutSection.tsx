import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de la sección "Sobre Nosotros"
 * Presenta la historia y valores de la empresa
 * Diseño con imagen y texto en layout responsive
 * Responsive: se adapta a web desktop, web móvil y apps nativas
 */
export function AboutSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Breakpoint para móvil (web y nativo)
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<View>(null);
  
  // Valores animados para fade up
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(80)).current;

  // Detectar cuando el componente entra en el viewport (solo en web)
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Si no es web, mostrar inmediatamente
      setIsVisible(true);
      fadeAnim.setValue(1);
      translateYAnim.setValue(0);
      return;
    }

    // En móvil web, mostrar inmediatamente sin esperar animación
    if (isMobile) {
      setIsVisible(true);
      fadeAnim.setValue(1);
      translateYAnim.setValue(0);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let domNode: Element | null = null;

    // Pequeño delay para asegurar que el componente esté montado
    const timeoutId = setTimeout(() => {
      if (!sectionRef.current) return;

      // Intersection Observer para web
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
              // Animar cuando entra en vista
              Animated.parallel([
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                  toValue: 0,
                  duration: 1000,
                  useNativeDriver: true,
                }),
              ]).start();
            }
          });
        },
        {
          threshold: 0.1, // Se activa cuando el 10% del componente es visible
          rootMargin: '0px 0px -50px 0px', // Margen adicional
        }
      );

      // Obtener el elemento DOM
      // @ts-ignore - React Native Web
      const element = sectionRef.current;

      if (element) {
        // Intentar diferentes métodos para obtener el nodo DOM
        // @ts-ignore
        if (element.getNode) {
          // @ts-ignore
          domNode = element.getNode();
        } else if (element._nativeNode) {
          // @ts-ignore
          domNode = element._nativeNode;
        } else if (element instanceof HTMLElement) {
          domNode = element;
        } else if (element.current) {
          // @ts-ignore
          domNode = element.current;
        }

        if (domNode && observer) {
          observer.observe(domNode);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer && domNode) {
        observer.unobserve(domNode);
      }
    };
  }, [isVisible, fadeAnim, translateYAnim]);

  // En móvil web, mostrar inmediatamente sin esperar animación
  useEffect(() => {
    if (Platform.OS === 'web' && isMobile && !isVisible) {
      fadeAnim.setValue(1);
      translateYAnim.setValue(0);
      setIsVisible(true);
    }
  }, [isMobile, isVisible, fadeAnim, translateYAnim]);

  // Si no es web, mostrar sin animación
  const animatedStyle = Platform.OS === 'web' ? {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  } : {};

  const shouldShowImmediately = Platform.OS === 'web' && isMobile;

  return (
    <Animated.View
      ref={sectionRef}
      style={[
        animatedStyle,
        {
          opacity: Platform.OS !== 'web' ? 1 : (shouldShowImmediately ? 1 : undefined),
          ...Platform.select({
            web: {
              minHeight: 'auto',
              overflow: 'visible',
            },
          }),
        },
      ]}>
      <ThemedView style={[
        styles.container,
        {
          paddingVertical: isMobile ? 48 : 80,
          paddingTop: isMobile ? 64 : 80,
          paddingHorizontal: isMobile ? 24 : 48,
          ...Platform.select({
            web: {
              minHeight: 'auto',
              overflow: 'visible',
            },
            default: {
              paddingTop: isMobile ? 64 : 80,
            },
          }),
        },
      ]}>
      <View style={[
        styles.content,
        {
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 64,
          ...Platform.select({
            web: {
              minHeight: 'auto',
              overflow: 'visible',
            },
          }),
        },
      ]}>
        <View style={[
          styles.textContent,
          {
            width: isMobile ? '100%' : undefined,
            ...Platform.select({
              web: {
                flexShrink: 0,
              },
            }),
          },
        ]}>
          <ThemedText type="title" style={[
            styles.title,
            {
              fontSize: isMobile ? 28 : 40,
              lineHeight: isMobile ? 36 : 52,
              letterSpacing: isMobile ? -0.3 : -0.5,
            },
          ]}>
            RELATIC PANAMÁ: Impulsando la Ciencia y la Investigación Cualitativa en Latinoamérica
          </ThemedText>
          <ThemedText style={[
            styles.description,
            {
              fontSize: isMobile ? 16 : 18,
              lineHeight: isMobile ? 24 : 28,
            },
          ]}>
            En RELATIC PANAMÁ, creemos en la fuerza transformadora del conocimiento y la investigación. Somos un punto de encuentro para docentes, investigadores y apasionados por la ciencia, brindando un espacio donde el saber se comparte, se construye y se difunde.
          </ThemedText>
          <ThemedText style={[
            styles.description,
            {
              fontSize: isMobile ? 16 : 18,
              lineHeight: isMobile ? 24 : 28,
            },
          ]}>
            Nuestra red conecta a profesionales del ámbito educativo, fomentando el intercambio de ideas, la colaboración y la innovación. Juntos, avanzamos hacia un futuro donde la investigación cualitativa impulsa el desarrollo académico y social en Latinoamérica.
          </ThemedText>

          <View style={[
            styles.statsContainer,
            { gap: isMobile ? 32 : 48 },
          ]}>
            <StatItem number="25+" label="Clientes" isMobile={isMobile} />
            <StatItem number="200+" label="Proyectos" isMobile={isMobile} />
            <StatItem number="20+" label="Años de experiencia" isMobile={isMobile} />
          </View>
        </View>

        <View style={[
          styles.imageContainer,
          {
            height: isMobile ? 300 : 500,
            width: isMobile ? '100%' : undefined,
            ...Platform.select({
              web: {
                minHeight: isMobile ? 300 : 500,
                flexShrink: 0,
              },
            }),
          },
        ]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop' }}
            style={styles.aboutImage}
            contentFit="cover"
            transition={200}
            placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
          />
        </View>
      </View>
    </ThemedView>
    </Animated.View>
  );
}

interface StatItemProps {
  number: string;
  label: string;
  isMobile: boolean;
}

/**
 * Componente para mostrar estadísticas
 * Números destacados con etiquetas descriptivas
 */
function StatItem({ number, label, isMobile }: StatItemProps) {
  return (
    <View style={[
      styles.statItem,
      Platform.OS !== 'web' && {
        paddingTop: 8,
      },
    ]}>
      <ThemedText style={[
        styles.statNumber,
        { 
          fontSize: isMobile ? 28 : 36,
          ...Platform.select({
            default: {
              lineHeight: isMobile ? 36 : 44,
            },
          }),
        },
      ]}>
        {number}
      </ThemedText>
      <ThemedText style={[
        styles.statLabel,
        { fontSize: isMobile ? 14 : 16 },
      ]}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  textContent: {
    flex: 1,
    gap: 20,
    width: '100%',
    ...Platform.select({
      web: {
        minHeight: 'auto',
      },
    }),
  },
  title: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  description: {
    color: '#6b7280',
    ...Platform.select({
      web: {
        overflow: 'visible',
        textOverflow: 'clip',
      },
    }),
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
    width: '100%',
    ...Platform.select({
      web: {
        overflow: 'visible',
      },
      default: {
        paddingTop: 8,
      },
    }),
  },
  statItem: {
    alignItems: 'flex-start',
    gap: 4,
    ...Platform.select({
      default: {
        paddingTop: 4,
      },
    }),
  },
  statNumber: {
    fontWeight: '700',
    color: '#1e40af',
    ...Platform.select({
      default: {
        includeFontPadding: false,
        textAlignVertical: 'top',
      },
    }),
  },
  statLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        display: 'flex',
      },
      default: {
        elevation: 4,
      },
    }),
  },
  aboutImage: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        objectFit: 'cover',
        display: 'block',
      },
    }),
  },
});

