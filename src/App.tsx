import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Farm } from './components/Farm';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { ProfileSection } from './sections/ProfileSection';
import { GameProvider } from './contexts/GameContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <MainLayout>
                      <Routes>
                        <Route path="/" element={<Farm />} />
                        <Route path="/farm" element={<Farm />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/profile" element={<ProfileSection />} />
                      </Routes>
                    </MainLayout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </GameProvider>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
