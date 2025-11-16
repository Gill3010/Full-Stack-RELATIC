import { Image } from 'expo-image';
import React from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

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

  return (
    <ThemedView style={[
      styles.container,
      {
        paddingVertical: isMobile ? 48 : 80,
        paddingHorizontal: isMobile ? 24 : 48,
      },
    ]}>
      <View style={[
        styles.content,
        {
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 64,
        },
      ]}>
        <View style={styles.textContent}>
          <ThemedText type="title" style={[
            styles.title,
            { fontSize: isMobile ? 28 : 40 },
          ]}>
            Sobre Nosotros
          </ThemedText>
          <ThemedText style={[
            styles.description,
            {
              fontSize: isMobile ? 16 : 18,
              lineHeight: isMobile ? 24 : 28,
            },
          ]}>
            Somos un equipo apasionado por la tecnología y la innovación. Con años de experiencia
            en desarrollo de software, nos especializamos en crear soluciones que combinan lo mejor
            del mundo web y móvil.
          </ThemedText>
          <ThemedText style={[
            styles.description,
            {
              fontSize: isMobile ? 16 : 18,
              lineHeight: isMobile ? 24 : 28,
            },
          ]}>
            Nuestra misión es ayudar a empresas y emprendedores a alcanzar sus objetivos mediante
            tecnologías de vanguardia y un enfoque centrado en el usuario.
          </ThemedText>

          <View style={[
            styles.statsContainer,
            { gap: isMobile ? 32 : 48 },
          ]}>
            <StatItem number="500+" label="Proyectos" isMobile={isMobile} />
            <StatItem number="200+" label="Clientes" isMobile={isMobile} />
            <StatItem number="10+" label="Años" isMobile={isMobile} />
          </View>
        </View>

        <View style={[
          styles.imageContainer,
          { height: isMobile ? 300 : 500 },
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
    <View style={styles.statItem}>
      <ThemedText style={[
        styles.statNumber,
        { fontSize: isMobile ? 28 : 36 },
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
  },
  title: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  description: {
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'flex-start',
    gap: 4,
  },
  statNumber: {
    fontWeight: '700',
    color: '#1e40af',
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

