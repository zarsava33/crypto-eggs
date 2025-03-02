import { Suspense } from 'react';
import MainLayout from './components/layout/MainLayout';
import GameProvider from './contexts/GameContext';
import NavigationProvider, { useNavigation } from './contexts/NavigationContext';
import { MainSection } from './sections/MainSection';
import { ProfileSection } from './sections/ProfileSection';
import { LeaderboardSection } from './sections/LeaderboardSection';

// Componente de carga
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

function AppContent() {
  const { activeSection } = useNavigation();

  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        {activeSection === 'main' && <MainSection />}
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'leaderboard' && <LeaderboardSection />}
      </Suspense>
    </MainLayout>
  );
}

function App() {
  return (
    <NavigationProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </NavigationProvider>
  );
}

export default App;
