import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainSection } from '../sections/MainSection';
import { ProfileSection } from '../sections/ProfileSection';
import { ShopSection } from '../sections/ShopSection';
import { Navigation } from '../components/Navigation';

function MainLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Efectos de fondo */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,255,0.15),rgba(0,0,0,0))]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),rgba(0,0,0,0))]" />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <header className="py-6 px-4">
          <h1 className="text-3xl font-bold gradient-text text-center">
            Crypto Eggs
          </h1>
        </header>
        <main className="container mx-auto px-4 pb-24">
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/profile" element={<ProfileSection />} />
            <Route path="/shop" element={<ShopSection />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </div>
  );
}

export default MainLayout; 