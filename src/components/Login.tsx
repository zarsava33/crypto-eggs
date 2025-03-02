import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export function Login() {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900">
      <motion.div 
        className="w-full max-w-md p-8 glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center gradient-text mb-8">
          Crypto Eggs
        </h1>
        
        <p className="text-gray-400 text-center mb-8">
          Inicia sesión para comenzar tu aventura y guardar tu progreso
        </p>

        <div className="space-y-4">
          {!isIOS && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithGoogle}
              className="w-full p-4 bg-white text-gray-900 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              <span>Continuar con Google</span>
            </motion.button>
          )}

          {isIOS && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithApple}
              className="w-full p-4 bg-black text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path 
                  fill="currentColor" 
                  d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.53-3.2 0-1.39.68-2.12.53-3.02-.36-5.16-5.38-3.54-13.36 2.68-13.17 1.25.04 2.12.62 2.95.65.89.02 1.73-.54 3.08-.58 2.05-.07 3.21.89 4.01 2.24-3.39 2.03-2.85 6.22.58 7.68-.65 1.87-1.51 3.74-3.99 3.14zM12.03 7.25c-.12-2.47 2.06-4.56 4.53-4.45.26 2.2-2.07 4.57-4.53 4.45z"
                />
              </svg>
              <span>Continuar con Apple</span>
            </motion.button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          Al iniciar sesión, aceptas nuestros términos y condiciones
        </p>
      </motion.div>
    </div>
  );
} 