import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente de la sección "Sobre Nosotros"
 * Presenta la historia y valores de la empresa
 * Diseño con imagen y texto en layout responsive
 */
export function AboutSection() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <ThemedText type="title" style={styles.title}>
            Sobre Nosotros
          </ThemedText>
          <ThemedText style={styles.description}>
            Somos un equipo apasionado por la tecnología y la innovación. Con años de experiencia
            en desarrollo de software, nos especializamos en crear soluciones que combinan lo mejor
            del mundo web y móvil.
          </ThemedText>
          <ThemedText style={styles.description}>
            Nuestra misión es ayudar a empresas y emprendedores a alcanzar sus objetivos mediante
            tecnologías de vanguardia y un enfoque centrado en el usuario.
          </ThemedText>

          <View style={styles.statsContainer}>
            <StatItem number="500+" label="Proyectos" />
            <StatItem number="200+" label="Clientes" />
            <StatItem number="10+" label="Años" />
          </View>
        </View>

        <View style={styles.imageContainer}>
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
  );
}

interface StatItemProps {
  number: string;
  label: string;
}

/**
 * Componente para mostrar estadísticas
 * Números destacados con etiquetas descriptivas
 */
function StatItem({ number, label }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <ThemedText style={styles.statNumber}>{number}</ThemedText>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
    </View>
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
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }),
    alignItems: 'center',
    gap: Platform.select({
      web: 64,
      default: 32,
    }),
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  textContent: {
    flex: 1,
    gap: 20,
  },
  title: {
    fontSize: Platform.select({
      web: 40,
      default: 28,
    }),
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
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
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Platform.select({
      web: 48,
      default: 32,
    }),
    marginTop: 16,
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'flex-start',
    gap: 4,
  },
  statNumber: {
    fontSize: Platform.select({
      web: 36,
      default: 28,
    }),
    fontWeight: '700',
    color: '#1e40af',
  },
  statLabel: {
    fontSize: Platform.select({
      web: 16,
      default: 14,
    }),
    color: '#6b7280',
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: Platform.select({
      web: 500,
      default: 300,
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
  aboutImage: {
    width: '100%',
    height: '100%',
  },
});

