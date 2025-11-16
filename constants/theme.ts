/**
 * Paleta de colores institucionales del proyecto
 * Colores profesionales con azul como color principal
 * Diseñado para mantener consistencia visual en web y móvil
 */

import { Platform } from 'react-native';

// Colores institucionales principales
const primaryBlue = '#1e40af'; // Azul institucional principal
const primaryBlueLight = '#3b82f6'; // Azul más claro para hover
const primaryBlueDark = '#1e3a8a'; // Azul más oscuro para estados activos
const accentBlue = '#60a5fa'; // Azul de acento

const tintColorLight = primaryBlue;
const tintColorDark = '#93c5fd';

export const Colors = {
  light: {
    text: '#1f2937', // Gris oscuro para mejor legibilidad
    background: '#ffffff', // Fondo blanco limpio
    tint: tintColorLight,
    icon: '#6b7280', // Gris medio para iconos
    tabIconDefault: '#9ca3af', // Gris claro para iconos inactivos
    tabIconSelected: tintColorLight,
    // Colores institucionales adicionales
    primary: primaryBlue,
    primaryLight: primaryBlueLight,
    primaryDark: primaryBlueDark,
    accent: accentBlue,
    border: 'rgba(0, 0, 0, 0.08)', // Borde sutil
    cardBackground: '#ffffff',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
  },
  dark: {
    text: '#f9fafb', // Blanco suave para texto en modo oscuro
    background: '#111827', // Gris muy oscuro
    tint: tintColorDark,
    icon: '#9ca3af',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorDark,
    // Colores institucionales para modo oscuro
    primary: primaryBlueLight,
    primaryLight: accentBlue,
    primaryDark: primaryBlue,
    accent: '#93c5fd',
    border: 'rgba(255, 255, 255, 0.1)',
    cardBackground: '#1f2937',
    cardShadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
