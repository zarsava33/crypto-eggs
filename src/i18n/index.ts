import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Secciones
      farm: 'Farm',
      shop: 'Shop',
      inventory: 'Inventory',
      friends: 'Friends',
      profile: 'Profile',

      // Huevos
      'common-egg': 'Common Egg',
      'rare-egg': 'Rare Egg',
      'epic-egg': 'Epic Egg',
      'legendary-egg': 'Legendary Egg',

      // Estados
      incubating: 'Incubating',
      hatched: 'Hatched',
      collected: 'Collected',
      ready: 'Ready to Collect',

      // Boosters
      'speed-booster': 'Speed Booster',
      'power-booster': 'Power Booster',
      'luck-booster': 'Luck Booster',

      // Mensajes
      'not-enough-money': 'Not enough money!',
      'deposit-success': 'Deposit successful!',
      'deposit-error': 'Error processing deposit',

      // Estadísticas
      'total-eggs': 'Total Eggs',
      'legendary-eggs': 'Legendary Eggs',
      'total-power': 'Total Power',
      'average-level': 'Average Level',

      // Botones
      buy: 'Buy',
      collect: 'Collect',
      deposit: 'Deposit',
      connect: 'Connect Wallet'
    }
  },
  es: {
    translation: {
      // Secciones
      farm: 'Granja',
      shop: 'Tienda',
      inventory: 'Inventario',
      friends: 'Amigos',
      profile: 'Perfil',

      // Huevos
      'common-egg': 'Huevo Común',
      'rare-egg': 'Huevo Raro',
      'epic-egg': 'Huevo Épico',
      'legendary-egg': 'Huevo Legendario',

      // Estados
      incubating: 'Incubando',
      hatched: 'Eclosionado',
      collected: 'Recolectado',
      ready: 'Listo para Recolectar',

      // Boosters
      'speed-booster': 'Acelerador',
      'power-booster': 'Potenciador',
      'luck-booster': 'Amuleto de Suerte',

      // Mensajes
      'not-enough-money': '¡No tienes suficiente dinero!',
      'deposit-success': '¡Depósito exitoso!',
      'deposit-error': 'Error al procesar el depósito',

      // Estadísticas
      'total-eggs': 'Total de Huevos',
      'legendary-eggs': 'Huevos Legendarios',
      'total-power': 'Poder Total',
      'average-level': 'Nivel Promedio',

      // Botones
      buy: 'Comprar',
      collect: 'Recolectar',
      deposit: 'Depositar',
      connect: 'Conectar Billetera'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;