import { ReactNode } from 'react';
import { Home, User, Trophy } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { activeSection, setActiveSection } = useNavigation();

  const navigationItems = [
    { key: 'main', icon: Home, label: 'Inicio' },
    { key: 'leaderboard', icon: Trophy, label: 'Líderes' },
    { key: 'profile', icon: User, label: 'Perfil' },
  ] as const;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Efectos de fondo */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,255,0.15),rgba(0,0,0,0))]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),rgba(0,0,0,0))]" />
      
      {/* Contenido principal */}
      <div className="relative flex flex-col min-h-screen pb-24">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Crypto Eggs
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-6 overflow-auto">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>

        {/* Navegación fija en la parte inferior */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="container mx-auto flex justify-center">
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-2">
              <div className="flex items-center gap-2">
                {navigationItems.map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === key
                        ? 'text-white bg-purple-500/20 shadow-lg'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} className={activeSection === key ? 'animate-pulse' : ''} />
                    <span className="text-sm font-medium">{label}</span>
                    {activeSection === key && (
                      <span className="absolute inset-0 rounded-xl bg-purple-400/20 animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export { MainLayout };
export default MainLayout;