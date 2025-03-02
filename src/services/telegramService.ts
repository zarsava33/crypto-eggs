export function connectTelegramWallet() {
  const webApp = window.Telegram?.WebApp;
  
  if (!webApp) {
    throw new Error('Telegram WebApp is not available');
  }

  // In a real app, you would validate the initData on your backend
  if (!webApp.initDataUnsafe.user?.id) {
    throw new Error('No user data available');
  }

  // Generate a deterministic address based on user ID
  const userAddress = `tg${webApp.initDataUnsafe.user.id.toString(16).padStart(40, '0')}`;
  
  return userAddress;
}