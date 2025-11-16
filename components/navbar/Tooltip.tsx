import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface TooltipProps {
  /** Texto a mostrar en el tooltip */
  text: string;
  /** Indica si el tooltip debe mostrarse */
  show: boolean;
}

/**
 * Componente de tooltip personalizado para web
 * Se muestra al pasar el mouse sobre elementos
 * Solo funciona en web
 */
export function Tooltip({ text, show }: TooltipProps) {
  if (Platform.OS !== 'web' || !show) {
    return null;
  }

  return (
    <View
      // @ts-ignore - React Native Web soporta position absolute y estilos CSS
      style={[
        styles.tooltip,
        {
          position: 'absolute',
          left: '100%',
          marginLeft: 8,
          top: '50%',
          transform: [{ translateY: -14 }],
          opacity: show ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 10001,
          transition: 'opacity 0.2s ease-in-out',
        },
      ]}>
      <ThemedText style={styles.tooltipText}>{text}</ThemedText>
      {/* Flecha del tooltip apuntando hacia la izquierda */}
      <View
        // @ts-ignore - React Native Web soporta position absolute
        style={[
          styles.tooltipArrow,
          {
            position: 'absolute',
            right: '100%',
            top: '50%',
            transform: [{ translateY: -4 }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#1f2937',
  },
});

