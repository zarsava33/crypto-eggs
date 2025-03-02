import winston from 'winston';
import path from 'path';
import { initLogger } from './initLogger';

const { combine, timestamp, printf, colorize } = winston.format;

// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  
  return msg;
});

export class LoggerService {
  private static instance: LoggerService;
  private logger: winston.Logger;

  private constructor() {
    // Inicializar el sistema de logging
    initLogger();
    
    const logsDir = path.join(process.cwd(), 'logs');

    this.logger = winston.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(
        timestamp(),
        logFormat
      ),
      transports: [
        // Archivo para todos los logs
        new winston.transports.File({
          filename: path.join(logsDir, 'combined.log'),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        // Archivo separado para errores
        new winston.transports.File({
          filename: path.join(logsDir, 'error.log'),
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    });

    // Si no estamos en producción, también log a la consola
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: combine(
            colorize(),
            logFormat
          ),
        })
      );
    }
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  info(message: string, metadata: object = {}) {
    this.logger.info(message, metadata);
  }

  error(message: string, error?: Error | unknown, metadata: object = {}) {
    const errorMetadata = error instanceof Error
      ? {
          ...metadata,
          errorMessage: error.message,
          stackTrace: error.stack,
        }
      : metadata;

    this.logger.error(message, errorMetadata);
  }

  warn(message: string, metadata: object = {}) {
    this.logger.warn(message, metadata);
  }

  debug(message: string, metadata: object = {}) {
    this.logger.debug(message, metadata);
  }
} 