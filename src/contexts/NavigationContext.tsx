import { createContext, useContext, useState, ReactNode } from 'react';

type Section = 'main' | 'profile' | 'leaderboard';

interface NavigationContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<Section>('main');

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation debe ser usado dentro de un NavigationProvider');
  }
  return context;
}

// Exportamos solo el Provider y el hook
export { NavigationProvider as default };