import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Datos de los servicios ofrecidos
 * Todos los servicios son gratuitos con solo registrarse
 */
const SERVICES = [
  {
    id: 1,
    title: 'Revistas Indexadas',
    description: 'Publicaciones científicas de alta calidad',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    link: '#revistas',
  },
  {
    id: 2,
    title: 'Carteles Digitales',
    description: 'Presenta tu trabajo en formato digital',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c002ed6?w=400&h=300&fit=crop',
    link: '#carteles',
  },
  {
    id: 3,
    title: 'Libros Digitales',
    description: 'Publica tu libro científico',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    link: '#libros',
  },
  {
    id: 4,
    title: 'Aprendizaje Continuo',
    description: 'Plataformas educativas y cursos especializados',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    link: '#aprendizaje',
  },
  {
    id: 5,
    title: 'Propiedad Intelectual',
    description: 'Protección y gestión de tus trabajos académicos',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    link: '#propiedad',
  },
  {
    id: 6,
    title: 'Herramientas de Apoyo para Investigación',
    description: 'Apoyo de investigación y relación científica',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    link: '#herramientas',
  },
];

/**
 * Componente de la sección de servicios
 * Muestra tarjetas con información de cada servicio
 * Diseño responsive con grid adaptativo
 * Responsive: se adapta a web desktop, web móvil y apps nativas
 */
export function ServicesSection() {
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

  // Si no es web, mostrar sin animación
  const animatedStyle = Platform.OS === 'web' ? {
    opacity: fadeAnim,
    transform: [{ translateY: translateYAnim }],
  } : {};

  return (
    <Animated.View
      ref={sectionRef}
      style={[
        animatedStyle,
        {
          opacity: Platform.OS !== 'web' ? 1 : undefined,
        },
      ]}>
      <ThemedView style={[
        styles.container,
        {
          paddingVertical: isMobile ? 48 : 80,
          paddingHorizontal: isMobile ? 24 : 48,
        },
      ]}>
      <View style={[
        styles.header,
        { marginBottom: isMobile ? 32 : 48 },
      ]}>
        <ThemedText type="title" style={[
          styles.sectionTitle,
          { fontSize: isMobile ? 28 : 40 },
        ]}>
          Nuestros Servicios
        </ThemedText>
        <ThemedText style={[
          styles.sectionDescription,
          { fontSize: isMobile ? 16 : 18 },
        ]}>
          Accede a todos nuestros servicios de forma <ThemedText style={styles.freeText}>completamente gratuita</ThemedText> con solo registrarte
        </ThemedText>
        <ThemedText style={[
          styles.engagementText,
          { fontSize: isMobile ? 14 : 16 },
        ]}>
          Sin costos ocultos, sin tarifas mensuales. Todo lo que necesitas para tu investigación académica está disponible para ti.
        </ThemedText>
      </View>

      <View style={[
        styles.servicesGrid,
        {
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 24,
          flexWrap: 'wrap',
        },
      ]}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} isMobile={isMobile} />
        ))}
      </View>
    </ThemedView>
    </Animated.View>
  );
}

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  };
  isMobile: boolean;
}

/**
 * Tarjeta individual de servicio
 * Componente reutilizable para cada servicio
 */
function ServiceCard({ service, isMobile }: ServiceCardProps) {
  const handlePress = () => {
    Linking.openURL(service.link).catch((err) => console.error('Error al abrir enlace:', err));
  };

  return (
    <ThemedView style={[
      styles.card,
      {
        ...(isMobile ? {} : {
          // @ts-ignore - React Native Web soporta width con calc
          width: 'calc(33.333% - 16px)',
        }),
        minWidth: isMobile ? '100%' : 280,
        maxWidth: isMobile ? '100%' : 400,
      },
    ]}>
      <View style={[
        styles.imageWrapper,
        { height: isMobile ? 180 : 200 },
      ]}>
        <Image
          source={{ uri: service.image }}
          style={styles.cardImage}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      </View>
      <View style={[
        styles.cardContent,
        { padding: isMobile ? 20 : 24 },
      ]}>
        <ThemedText type="subtitle" style={[
          styles.cardTitle,
          { fontSize: isMobile ? 20 : 22 },
        ]}>
          {service.title}
        </ThemedText>
        <ThemedText style={[
          styles.cardDescription,
          {
            fontSize: isMobile ? 14 : 15,
            lineHeight: isMobile ? 22 : 24,
          },
        ]}>
          {service.description}
        </ThemedText>
        
        {/* Botón Ver más con flecha */}
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.seeMoreButton,
            pressed && styles.buttonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Ver más sobre ${service.title}`}>
          <ThemedText style={styles.seeMoreText}>
            Ver más
          </ThemedText>
          <ThemedText style={styles.arrow}>→</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  sectionDescription: {
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 26,
  },
  freeText: {
    color: '#1e40af',
    fontWeight: '700',
  },
  engagementText: {
    color: '#4b5563',
    textAlign: 'center',
    maxWidth: 700,
    marginTop: 8,
    fontStyle: 'italic',
  },
  servicesGrid: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.12)',
        },
      },
      default: {
        elevation: 2,
      },
    }),
  },
  imageWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#6b7280',
    marginBottom: 12,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  buttonPressed: {
    opacity: 0.7,
  },
  seeMoreText: {
    color: '#1e40af',
    fontWeight: '600',
    fontSize: 15,
  },
  arrow: {
    color: '#1e40af',
    fontSize: 18,
    fontWeight: '600',
    ...Platform.select({
      web: {
        transition: 'transform 0.3s ease',
        '.seeMoreButton:hover &': {
          transform: 'translateX(4px)',
        },
      },
    }),
  },
});

