import { useState, useEffect } from 'react';
import type { TelegramUser } from '../types';

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser>({
    id: 0,
    first_name: 'Guest',
    last_name: '',
    username: 'guest',
    language_code: 'en',
    is_premium: false
  });

  useEffect(() => {
    // Intentar obtener el usuario de Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return user;
}