import fs from 'fs';
import path from 'path';

export function initLogger() {
  const logsDir = path.join(process.cwd(), 'logs');

  // Crear el directorio de logs si no existe
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // Asegurarse de que los archivos de log existan
  const logFiles = ['combined.log', 'error.log'];
  logFiles.forEach(file => {
    const logFile = path.join(logsDir, file);
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, '', 'utf8');
    }
  });
} 