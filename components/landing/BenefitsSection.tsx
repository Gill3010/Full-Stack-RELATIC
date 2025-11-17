import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Datos de los beneficios
const BENEFITS = [
  {
    id: 1,
    title: 'Revistas Especializadas',
    description: 'Acceso a publicaciones científicas indexadas de alto impacto',
    icon: 'menu-book' as const,
  },
  {
    id: 2,
    title: 'Base de Datos',
    description: 'Consulta y acceso a bases de datos académicas especializadas',
    icon: 'storage' as const,
  },
  {
    id: 3,
    title: 'Asesoría Profesional',
    description: 'Orientación experta para tu desarrollo académico y profesional',
    icon: 'business-center' as const,
  },
  {
    id: 4,
    title: 'Certificados Académicos',
    description: 'Obtén certificaciones que validen tus conocimientos y habilidades',
    icon: 'school' as const,
  },
  {
    id: 5,
    title: 'Apoyo de Perfil Científico',
    description: 'Desarrolla y fortalece tu perfil como investigador científico',
    icon: 'science' as const,
  },
  {
    id: 6,
    title: 'Facilidades de Publicación',
    description: 'Publica tus trabajos con apoyo editorial y técnico especializado',
    icon: 'article' as const,
  },
  {
    id: 7,
    title: 'Descuentos en Eventos',
    description: 'Accede a descuentos exclusivos en congresos y conferencias',
    icon: 'confirmation-number' as const,
  },
  {
    id: 8,
    title: 'Cartas de Referencia',
    description: 'Solicita cartas de recomendación de expertos en tu área',
    icon: 'mail' as const,
  },
  {
    id: 9,
    title: 'Asesorías Especializadas',
    description: 'Recibe asesoramiento personalizado en metodología e investigación',
    icon: 'lightbulb' as const,
  },
  {
    id: 10,
    title: 'Incentivos Económicos',
    description: 'Beneficios económicos y becas para proyectos de investigación',
    icon: 'attach-money' as const,
  },
];

/**
 * Componente de la sección de beneficios
 * Carrusel horizontal automático con cards de beneficios
 * Solo visible en web (móvil y desktop)
 */
export function BenefitsSection() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Calcular cuántos cards mostrar según el tamaño de pantalla
  const cardsPerView = isMobile ? 1 : width < 1024 ? 2 : 3;
  const containerPadding = isMobile ? 48 : 96;
  const cardSpacing = 24;
  const availableWidth = width - containerPadding;
  const cardWidth = (availableWidth - (cardSpacing * (cardsPerView - 1))) / cardsPerView;
  const slideWidth = availableWidth + cardSpacing; // Ancho del viewport + spacing
  const totalSlides = Math.ceil(BENEFITS.length / cardsPerView);

  // Función para ir al siguiente slide (infinito)
  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const next = (prevIndex + 1) % totalSlides;
      
      if (scrollViewRef.current) {
        const targetScrollX = next * slideWidth;
        
        // Si estamos en el último slide, necesitamos hacer scroll a los cards duplicados
        // y luego resetear al inicio sin que se note
        if (prevIndex === totalSlides - 1) {
          // Calcular la posición de los cards duplicados
          // Los cards duplicados empiezan después de todos los originales
          const totalOriginalWidth = BENEFITS.length * cardWidth + (BENEFITS.length - 1) * cardSpacing;
          const duplicateScrollX = totalOriginalWidth;
          
          scrollViewRef.current.scrollTo({
            x: duplicateScrollX,
            animated: true,
          });
          
          // Después de la animación, resetear al inicio sin animación
          setTimeout(() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: 0,
                animated: false,
              });
            }
          }, 500);
          return 0;
        } else {
          // Scroll suave al siguiente slide
          scrollViewRef.current.scrollTo({
            x: targetScrollX,
            animated: true,
          });
          return next;
        }
      }
      return next;
    });
  }, [totalSlides, slideWidth, cardWidth, cardSpacing]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prev = (prevIndex - 1 + totalSlides) % totalSlides;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: prev * slideWidth,
          animated: true,
        });
      }
      return prev;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * slideWidth,
        animated: true,
      });
    }
  };

  // Detectar scroll manual
  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent?.contentOffset?.x || 0;
    const maxScroll = slideWidth * (totalSlides - 1);
    
    // Si el usuario hace scroll más allá del último slide, resetear al inicio
    if (scrollX >= maxScroll - 10) {
      const newIndex = totalSlides - 1;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    } else if (scrollX <= 10) {
      // Si el usuario hace scroll al inicio
      if (currentIndex !== 0) {
        setCurrentIndex(0);
      }
    } else {
      const newIndex = Math.round(scrollX / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
        setCurrentIndex(newIndex);
      }
    }
  };

  // Auto-play
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
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

  // El componente ahora funciona en web y apps nativas

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingVertical: isMobile ? 48 : 64,
          paddingHorizontal: isMobile ? 24 : 48,
        },
      ]}
      {...(Platform.OS === 'web' && {
        // @ts-ignore - React Native Web soporta onMouseEnter/onMouseLeave
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
      })}>
      {/* Título de la sección */}
      <View style={[styles.header, { marginBottom: isMobile ? 32 : 40 }]}>
        <ThemedText type="title" style={[
          styles.sectionTitle,
          { fontSize: isMobile ? 28 : 36 },
        ]}>
          Beneficios Exclusivos
        </ThemedText>
        <ThemedText style={[
          styles.sectionDescription,
          { fontSize: isMobile ? 16 : 18 },
        ]}>
          Descubre todos los beneficios que tenemos para ti
        </ThemedText>
      </View>

      {/* Contenedor del carrusel */}
      <View style={styles.carouselWrapper}>
        {/* Contenedor de scroll horizontal */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onMomentumScrollEnd={(event) => {
            // Cuando el scroll termina, verificar si necesitamos resetear
            const scrollX = event.nativeEvent?.contentOffset?.x || 0;
            const maxScroll = slideWidth * (totalSlides - 1);
            if (scrollX >= maxScroll - 5) {
              // Si estamos muy cerca del final, resetear al inicio sin animación
              setTimeout(() => {
                if (scrollViewRef.current) {
                  scrollViewRef.current.scrollTo({
                    x: 0,
                    animated: false,
                  });
                  setCurrentIndex(0);
                }
              }, 100);
            }
          }}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          {/* Cards originales */}
          {BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={`original-${benefit.id}`}
              benefit={benefit}
              isMobile={isMobile}
              cardWidth={cardWidth}
              index={index}
            />
          ))}
          {/* Duplicar los primeros cards para efecto infinito */}
          {BENEFITS.slice(0, cardsPerView).map((benefit, index) => (
            <BenefitCard
              key={`duplicate-${benefit.id}`}
              benefit={benefit}
              isMobile={isMobile}
              cardWidth={cardWidth}
              index={BENEFITS.length + index}
            />
          ))}
        </ScrollView>

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
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
              onPress={() => goToSlide(index)}
              accessibilityRole="button"
              accessibilityLabel={`Ir al slide ${index + 1}`}
            />
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

/**
 * Componente individual de card de beneficio
 */
function BenefitCard({
  benefit,
  isMobile,
  cardWidth,
  index,
}: {
  benefit: typeof BENEFITS[0];
  isMobile: boolean;
  cardWidth: number;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (Platform.OS === 'web') {
      Animated.timing(scaleAnim, {
        toValue: isHovered ? 1.05 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isHovered, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          width: cardWidth,
          marginRight: index < BENEFITS.length - 1 ? 24 : 0,
          transform: [{ scale: scaleAnim }],
        },
      ]}
      {...(Platform.OS === 'web' && {
        // @ts-ignore - React Native Web soporta onMouseEnter/onMouseLeave
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      })}>
      {/* Ícono con degradado */}
      {Platform.OS === 'web' ? (
        React.createElement('div', {
          style: {
            width: 72,
            height: 72,
            borderRadius: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
          },
        }, React.createElement(MaterialIcons, {
          name: benefit.icon,
          size: 36,
          color: '#ffffff',
        }))
      ) : (
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={benefit.icon}
            size={36}
            color="#ffffff"
          />
        </View>
      )}
      
      {/* Título */}
      <ThemedText style={[
        styles.cardTitle,
        { fontSize: isMobile ? 16 : 18 },
      ]}>
        {benefit.title}
      </ThemedText>
      
      {/* Descripción */}
      <ThemedText style={[
        styles.cardDescription,
        { fontSize: isMobile ? 13 : 14 },
      ]}>
        {benefit.description}
      </ThemedText>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    ...Platform.select({
      web: {
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #ffffff 100%)',
      },
      default: {
        backgroundColor: '#eff6ff',
      },
    }),
  },
  header: {
    alignItems: 'center',
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionDescription: {
    color: '#6b7280',
    textAlign: 'center',
  },
  carouselWrapper: {
    width: '100%',
    maxWidth: 1400,
    alignSelf: 'center',
    position: 'relative',
  },
  scrollContainer: {
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 12,
    ...Platform.select({
      web: {
        display: 'flex',
        flexDirection: 'row',
      },
    }),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 220,
    ...Platform.select({
      web: {
        borderTopLeftRadius: 16,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        ':hover': {
          boxShadow: '0 8px 20px rgba(30, 64, 175, 0.15)',
        },
      },
      default: {
        borderTopLeftRadius: 16,
        elevation: 2,
      },
    }),
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#1e40af',
    ...Platform.select({
      web: {
        backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        display: 'flex',
        flexShrink: 0,
      },
      default: {
        backgroundColor: '#1e40af',
      },
    }),
  },
  icon: {
    fontSize: 32,
    color: '#ffffff',
  },
  cardTitle: {
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    ...Platform.select({
      web: {
        flex: 1,
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
    left: -24,
  },
  nextButton: {
    right: -24,
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

