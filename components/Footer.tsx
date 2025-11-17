import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

/**
 * Componente Footer para web (móvil y escritorio)
 * Solo se muestra en web, no en aplicaciones móviles nativas
 */
export function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Solo renderizar en web
  if (Platform.OS !== 'web') {
    return null;
  }

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error al abrir enlace:', err));
  };

  // Componente wrapper para el degradado en web
  const GradientContainer = ({ children, style }: { children: React.ReactNode; style?: any }) => {
    if (Platform.OS === 'web') {
      const mergedStyle = Array.isArray(style)
        ? Object.assign({}, ...style.filter(s => s))
        : style || {};
      
      return React.createElement('div', {
        style: {
          background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          ...mergedStyle,
        },
      }, children);
    }
    return <ThemedView style={[{ backgroundColor: '#000000' }, style]}>{children}</ThemedView>;
  };

  return (
    <GradientContainer style={styles.container}>
      <View style={[styles.content, { paddingHorizontal: isMobile ? 24 : 48, paddingVertical: isMobile ? 40 : 60 }]}>
        {/* Grid principal con todas las secciones en columnas */}
        <View style={[styles.mainGrid, { flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 40 }]}>
          {/* Sección 1: Información sobre Relatic Panamá */}
          <View style={[styles.section, { flex: isMobile ? undefined : 1 }]}>
            <ThemedText style={styles.mainTitle}>RELATIC PANAMÁ</ThemedText>
            <ThemedText style={styles.description}>
              Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.
            </ThemedText>
          </View>

          {/* Sección 2: Navegación */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Navegación</ThemedText>
            <View style={styles.linkList}>
              <Pressable onPress={() => handleLinkPress('#inicio')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Inicio</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#nosotros')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Nosotros</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#actividades')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Actividades</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#blog')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Blog</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Sección 3: Servicios */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Servicios</ThemedText>
            <View style={styles.linkList}>
              <Pressable onPress={() => handleLinkPress('#revistas')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Revistas Indexadas</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#carteles')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Carteles Digitales</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#libros')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Libros Digitales</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#aprendizaje')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Aprendizaje Continuo</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('#propiedad')} style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Propiedad Intelectual</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Sección 4: Contáctanos */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Contáctanos</ThemedText>
            <View style={styles.contactList}>
              <Pressable onPress={() => handleLinkPress('mailto:gerencia@relaticpanama.org')} style={styles.contactItem}>
                <ThemedText style={styles.contactText}>gerencia@relaticpanama.org</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('tel:+50766457685')} style={styles.contactItem}>
                <ThemedText style={styles.contactText}>+507 6645-7685 | +507 208-4689</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleLinkPress('https://maps.google.com/?q=Ciudad+de+Panamá,+Panamá')} style={styles.contactItem}>
                <ThemedText style={styles.contactText}>Ciudad de Panamá, Panamá</ThemedText>
              </Pressable>
            </View>

            {/* Redes sociales */}
            <View style={styles.socialContainer}>
              <Pressable
                onPress={() => handleLinkPress('https://www.linkedin.com/company/relatic-panama')}
                style={styles.socialIconWrapper}
                accessibilityLabel="LinkedIn">
                <View style={styles.socialIconCircle}>
                  <LinkedInIcon />
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleLinkPress('https://www.instagram.com/relaticpanama')}
                style={styles.socialIconWrapper}
                accessibilityLabel="Instagram">
                <View style={styles.socialIconCircle}>
                  <InstagramIcon />
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleLinkPress('https://x.com/relaticpanama')}
                style={styles.socialIconWrapper}
                accessibilityLabel="X (Twitter)">
                <View style={styles.socialIconCircle}>
                  <XIcon />
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleLinkPress('https://www.facebook.com/relaticpanama')}
                style={styles.socialIconWrapper}
                accessibilityLabel="Facebook">
                <View style={styles.socialIconCircle}>
                  <FacebookIcon />
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleLinkPress('https://www.youtube.com/@relaticpanama')}
                style={styles.socialIconWrapper}
                accessibilityLabel="YouTube">
                <View style={styles.socialIconCircle}>
                  <YouTubeIcon />
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleLinkPress('https://wa.me/50766457685')}
                style={styles.socialIconWrapper}
                accessibilityLabel="WhatsApp">
                <View style={styles.socialIconCircle}>
                  <WhatsAppIcon />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />

      {/* Footer inferior con copyright */}
      <View style={[styles.bottomFooter, { paddingHorizontal: isMobile ? 24 : 48, paddingVertical: isMobile ? 20 : 24 }]}>
        <ThemedText style={styles.copyrightText}>
          © 2025 Relatic Panamá. Todos los derechos reservados.
        </ThemedText>
        <ThemedText style={styles.copyrightText}>
          Ciencia, Tecnología e Innovación.
        </ThemedText>
        <ThemedText style={styles.poweredByText}>
          Powered by{' '}
          <ThemedText style={styles.innovaText}>Innova Proyectos</ThemedText>
        </ThemedText>
      </View>
    </GradientContainer>
  );
}

// Iconos SVG para redes sociales con colores originales (solo para web)
const SocialIcon = ({ svgContent, testID }: { svgContent: string; testID?: string }) => {
  if (Platform.OS === 'web') {
    // Usar createElement para crear un div HTML nativo en web
    return React.createElement('div', {
      dangerouslySetInnerHTML: { __html: svgContent },
      style: {
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      },
      'data-testid': testID,
    });
  }
  return null;
};

const LinkedInIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/></svg>'
    testID="linkedin-icon"
  />
);

const InstagramIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/></svg>'
    testID="instagram-icon"
  />
);

const XIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000"/></svg>'
    testID="x-icon"
  />
);

const FacebookIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>'
    testID="facebook-icon"
  />
);

const YouTubeIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/></svg>'
    testID="youtube-icon"
  />
);

const WhatsAppIcon = () => (
  <SocialIcon
    svgContent='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#25D366"/></svg>'
    testID="whatsapp-icon"
  />
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000000',
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  content: {
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  mainGrid: {
    width: '100%',
  },
  section: {
    gap: 16,
    flex: 1,
    minWidth: 200,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#b0b0b0',
  },
  linkList: {
    gap: 12,
  },
  linkItem: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#b0b0b0',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        textDecorationLine: 'none',
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#ffffff',
        },
      },
    }),
  },
  contactList: {
    gap: 12,
    marginBottom: 20,
  },
  contactItem: {
    paddingVertical: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#b0b0b0',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#ffffff',
        },
      },
    }),
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  socialIconWrapper: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  socialIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        ':hover': {
          backgroundColor: '#f3f4f6',
          transform: 'scale(1.15)',
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
        },
      },
      default: {
        elevation: 2,
      },
    }),
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
  },
  bottomFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  copyrightText: {
    fontSize: 14,
    color: '#b0b0b0',
    textAlign: 'center',
  },
  poweredByText: {
    fontSize: 14,
    color: '#b0b0b0',
    textAlign: 'center',
  },
  innovaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

