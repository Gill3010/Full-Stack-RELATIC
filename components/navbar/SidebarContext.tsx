import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Platform } from 'react-native';

interface SidebarContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Provider para el contexto del sidebar
 * Solo funciona en web desktop
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarWidth = isExpanded ? 260 : 72;

  // Solo proporcionar contexto en web
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * Hook para acceder al contexto del sidebar
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    // Retornar valores por defecto si no estamos en web
    return { isExpanded: false, setIsExpanded: () => {}, sidebarWidth: 0 };
  }
  return context;
}

