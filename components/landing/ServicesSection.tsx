import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Datos de los servicios ofrecidos
 * Fácil de extender agregando más servicios
 */
const SERVICES = [
  {
    id: 1,
    title: 'Desarrollo Web',
    description: 'Creamos sitios web modernos y responsivos que se adaptan a todos los dispositivos.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Aplicaciones Móviles',
    description: 'Desarrollamos apps nativas e híbridas para iOS y Android con excelente rendimiento.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Consultoría Tecnológica',
    description: 'Asesoramos a empresas para optimizar sus procesos y adoptar las mejores tecnologías.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
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

  return (
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
          Soluciones integrales diseñadas para impulsar tu negocio
        </ThemedText>
      </View>

      <View style={[
        styles.servicesGrid,
        {
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 24,
        },
      ]}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} isMobile={isMobile} />
        ))}
      </View>
    </ThemedView>
  );
}

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  isMobile: boolean;
}

/**
 * Tarjeta individual de servicio
 * Componente reutilizable para cada servicio
 */
function ServiceCard({ service, isMobile }: ServiceCardProps) {
  return (
    <ThemedView style={[
      styles.card,
      {
        flex: isMobile ? undefined : 1,
        minWidth: isMobile ? '100%' : 280,
        maxWidth: isMobile ? '100%' : 360,
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
    maxWidth: 600,
  },
  servicesGrid: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
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
  },
});

