import { useEffect, useState } from 'react';
import type { TelegramWebApp } from '../types';

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | undefined>(
    window.Telegram?.WebApp
  );

  useEffect(() => {
    if (webApp) {
      webApp.ready();
      webApp.expand();
    }
  }, [webApp]);

  return webApp;
}