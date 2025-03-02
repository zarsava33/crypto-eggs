import { BrowserRouter } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter basename="/crypto-eggs">
      <GameProvider>
        <div className="min-h-screen bg-gray-900">
          <MainLayout />
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
