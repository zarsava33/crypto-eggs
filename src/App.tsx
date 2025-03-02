import { BrowserRouter } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter basename="/crypto-eggs">
      <GameProvider>
        <MainLayout />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
