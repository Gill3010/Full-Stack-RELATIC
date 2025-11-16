import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

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
 */
export function ServicesSection() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Nuestros Servicios
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Soluciones integrales diseñadas para impulsar tu negocio
        </ThemedText>
      </View>

      <View style={styles.servicesGrid}>
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
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
}

/**
 * Tarjeta individual de servicio
 * Componente reutilizable para cada servicio
 */
function ServiceCard({ service }: ServiceCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: service.image }}
          style={styles.cardImage}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        />
      </View>
      <View style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {service.title}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          {service.description}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.select({
      web: 80,
      default: 48,
    }),
    paddingHorizontal: Platform.select({
      web: 48,
      default: 24,
    }),
    backgroundColor: '#f9fafb',
  },
  header: {
    alignItems: 'center',
    marginBottom: Platform.select({
      web: 48,
      default: 32,
    }),
    gap: 12,
  },
  sectionTitle: {
    fontSize: Platform.select({
      web: 40,
      default: 28,
    }),
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: Platform.select({
      web: 18,
      default: 16,
    }),
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 600,
  },
  servicesGrid: {
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }),
    gap: Platform.select({
      web: 24,
      default: 20,
    }),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    flex: Platform.select({
      web: 1,
      default: undefined,
    }),
    minWidth: Platform.select({
      web: 280,
      default: '100%',
    }),
    maxWidth: Platform.select({
      web: 360,
      default: '100%',
    }),
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
    height: Platform.select({
      web: 200,
      default: 180,
    }),
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: Platform.select({
      web: 24,
      default: 20,
    }),
    gap: 8,
  },
  cardTitle: {
    fontSize: Platform.select({
      web: 22,
      default: 20,
    }),
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: Platform.select({
      web: 15,
      default: 14,
    }),
    lineHeight: Platform.select({
      web: 24,
      default: 22,
    }),
    color: '#6b7280',
  },
});

