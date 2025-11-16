import { Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { Footer } from '@/components/Footer';
import {
  AboutSection,
  CTASection,
  HeroSection,
  ServicesSection,
} from '@/components/landing';
import { MainHeader } from '@/components/main-header';
import { useSidebar } from '@/components/navbar/SidebarContext';
import { TopNavbar } from '@/components/navbar/TopNavbar';
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
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && width >= 768;

  // Solo aplicar marginLeft y marginTop en web desktop, no en web móvil
  const contentWrapperStyle = isDesktopWeb
    ? {
        ...styles.contentWrapper,
        marginLeft: sidebarWidth,
        marginTop: 80, // Espacio para el TopNavbar
        // @ts-ignore - React Native Web soporta transition CSS
        transition: 'margin-left 0.3s ease-in-out',
      }
    : styles.contentWrapper;

  return (
    <ThemedView style={styles.screen}>
      {/* TopNavbar solo visible en web desktop */}
      <TopNavbar />

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
          <Footer />
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
