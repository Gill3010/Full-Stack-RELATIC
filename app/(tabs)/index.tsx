import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import {
  AboutSection,
  CTASection,
  HeroSection,
  ServicesSection,
} from '@/components/landing';
import { MainHeader } from '@/components/main-header';
import { useSidebar } from '@/components/navbar/SidebarContext';
import { ThemedView } from '@/components/themed-view';

/**
 * Página principal / Landing Page
 * 
 * Estructura:
 * - Header/Navbar (MainHeader)
 * - Hero Section (primera impresión)
 * - Services Section (servicios ofrecidos)
 * - About Section (sobre nosotros)
 * - CTA Section (llamada a la acción)
 * 
 * Diseño responsive que se adapta automáticamente a:
 * - Web desktop (>= 768px)
 * - Web móvil (< 768px)
 * - Apps nativas (iOS/Android)
 */
export default function HomeScreen() {
  const { sidebarWidth } = useSidebar();

  const contentWrapperStyle = Platform.OS === 'web' 
    ? {
        ...styles.contentWrapper,
        marginLeft: sidebarWidth,
        // @ts-ignore - React Native Web soporta transition CSS
        transition: 'margin-left 0.3s ease-in-out',
      }
    : styles.contentWrapper;

  return (
    <ThemedView style={styles.screen}>
      <MainHeader />

      {/* Wrapper para el push layout en web */}
      <View style={contentWrapperStyle}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <CTASection />
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Padding mínimo para evitar que el contenido toque los bordes
    paddingBottom: Platform.select({
      web: 40,
      default: 32,
    }),
    // En web, el contenido se centra automáticamente
    ...Platform.select({
      web: {
        maxWidth: '100%',
      },
    }),
  },
});
