import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ErrorContextType {
  error: Error | null;
  reportError: (error: Error, context?: string) => void;
  clearError: () => void;
  contactSupport: (message: string) => Promise<void>;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

interface ErrorProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<Error | null>(null);

  const reportError = (error: Error, context?: string) => {
    console.error(`Error en ${context || 'la aplicación'}:`, error);
    setError(error);
    // Aquí podríamos enviar el error a un servicio de monitoreo
  };

  const clearError = () => {
    setError(null);
  };

  const contactSupport = async (message: string) => {
    // Simular envío a soporte técnico
    console.log('Mensaje enviado a soporte:', message);
    // Aquí podríamos integrar con un sistema real de tickets
  };

  return (
    <ErrorContext.Provider value={{ error, reportError, clearError, contactSupport }}>
      {error ? (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl border border-purple-500/50 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-red-400 mb-4">¡Ups! Algo salió mal</h2>
            <p className="text-gray-300 mb-4">{error.message}</p>
            <div className="flex gap-4">
              <button
                onClick={clearError}
                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
              >
                Continuar
              </button>
              <button
                onClick={() => contactSupport(error.message)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Contactar Soporte
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError debe usarse dentro de un ErrorProvider');
  }
  return context;
} 