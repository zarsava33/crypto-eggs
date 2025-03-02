import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black to-transparent">
      <div className="container mx-auto flex justify-center">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-2">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isActive('/') 
                  ? 'text-white bg-purple-500/20 shadow-lg' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <Home size={20} className={isActive('/') ? 'animate-pulse' : ''} />
              <span className="text-sm font-medium">Inicio</span>
              {isActive('/') && (
                <span className="absolute inset-0 rounded-xl bg-purple-400/20 animate-ping" />
              )}
            </Link>

            <Link
              to="/profile"
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isActive('/profile')
                  ? 'text-white bg-purple-500/20 shadow-lg'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <User size={20} className={isActive('/profile') ? 'animate-pulse' : ''} />
              <span className="text-sm font-medium">Perfil</span>
              {isActive('/profile') && (
                <span className="absolute inset-0 rounded-xl bg-purple-400/20 animate-ping" />
              )}
            </Link>

            <Link
              to="/shop"
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isActive('/shop')
                  ? 'text-white bg-purple-500/20 shadow-lg'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <ShoppingBag size={20} className={isActive('/shop') ? 'animate-pulse' : ''} />
              <span className="text-sm font-medium">Tienda</span>
              {isActive('/shop') && (
                <span className="absolute inset-0 rounded-xl bg-purple-400/20 animate-ping" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 