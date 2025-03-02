import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Farm } from './components/Farm';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { ProfileSection } from './sections/ProfileSection';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Farm />} />
            <Route path="/farm" element={<Farm />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<ProfileSection />} />
          </Routes>
        </MainLayout>
      </Router>
    </GameProvider>
  );
}

export default App;
