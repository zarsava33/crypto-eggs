import { LoggerService } from './LoggerService';
import { RetryService } from './RetryService';
import { PasswordService } from './PasswordService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = LoggerService.getInstance();

// Asegurar que Prisma se cierre correctamente en desarrollo
if (process.env.NODE_ENV === 'development') {
  process.on('beforeExit', () => {
    void prisma.$disconnect();
  });
}

export class DatabaseService {
  // Configuración de reintentos para operaciones críticas
  private static readonly CRITICAL_OPERATION_RETRY = {
    maxAttempts: 5,
    initialDelay: 1000,
    maxDelay: 15000,
  };

  // Usuarios
  static async createUser(email: string, username: string, password: string) {
    try {
      // Validar la contraseña
      if (!PasswordService.validatePassword(password)) {
        throw new Error('La contraseña no cumple con los requisitos mínimos de seguridad');
      }

      logger.info('Creating new user', { email, username });
      
      // Hashear la contraseña
      const hashedPassword = await PasswordService.hashPassword(password);
      
      // Operación crítica: crear usuario
      const result = await RetryService.withRetry(
        async () => prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            progress: {
              create: {} // Crear progreso inicial con valores por defecto
            }
          },
          include: {
            progress: true
          }
        }),
        this.CRITICAL_OPERATION_RETRY
      );
      
      logger.info('User created successfully', { userId: result.id });
      return result;
    } catch (error) {
      logger.error('Error creating user', error, { email, username });
      throw error;
    }
  }

  // Método para verificar credenciales de usuario
  static async verifyUserCredentials(email: string, password: string) {
    try {
      logger.debug('Verifying user credentials', { email });
      
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        logger.warn('User not found during credential verification', { email });
        return null;
      }

      const isValid = await PasswordService.verifyPassword(password, user.password);
      
      if (!isValid) {
        logger.warn('Invalid password during credential verification', { email });
        return null;
      }

      logger.info('User credentials verified successfully', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Error verifying user credentials', error, { email });
      throw error;
    }
  }

  static async getUserProgress(userId: string) {
    try {
      logger.debug('Fetching user progress', { userId });
      const progress = await prisma.progress.findUnique({
        where: { userId }
      });
      if (!progress) {
        logger.warn('User progress not found', { userId });
      }
      return progress;
    } catch (error) {
      logger.error('Error getting user progress', error, { userId });
      throw error;
    }
  }

  static async updateProgress(userId: string, data: {
    level?: number;
    experience?: number;
    eggsHatched?: number;
    totalEggs?: number;
    coins?: number;
  }) {
    try {
      logger.debug('Updating user progress', { userId, ...data });
      // Operación crítica: actualizar progreso
      const result = await RetryService.withRetry(
        async () => prisma.progress.update({
          where: { userId },
          data: {
            ...data,
            lastPlayedAt: new Date()
          }
        }),
        this.CRITICAL_OPERATION_RETRY
      );
      logger.info('Progress updated successfully', { userId });
      return result;
    } catch (error) {
      logger.error('Error updating progress', error, { userId, ...data });
      throw error;
    }
  }

  // Tabla de líderes
  static async addScore(userId: string, score: number, category: string) {
    try {
      logger.debug('Adding new score', { userId, score, category });
      // Operación crítica: agregar puntuación
      const result = await RetryService.withRetry(
        async () => prisma.score.create({
          data: {
            userId,
            score,
            category
          }
        }),
        this.CRITICAL_OPERATION_RETRY
      );
      logger.info('Score added successfully', { userId, scoreId: result.id });
      return result;
    } catch (error) {
      logger.error('Error adding score', error, { userId, score, category });
      throw error;
    }
  }

  static async getLeaderboard(category: string, limit = 10) {
    try {
      logger.debug('Fetching leaderboard', { category, limit });
      const leaderboard = await prisma.score.findMany({
        where: { category },
        orderBy: { score: 'desc' },
        take: limit,
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      });
      logger.info('Leaderboard fetched successfully', { 
        category, 
        entriesCount: leaderboard.length 
      });
      return leaderboard;
    } catch (error) {
      logger.error('Error getting leaderboard', error, { category, limit });
      throw error;
    }
  }

  // Estadísticas globales
  static async getGlobalStats() {
    try {
      logger.debug('Fetching global stats');
      // Operación crítica: obtener estadísticas globales
      const stats = await RetryService.withRetry(
        async () => {
          const totalUsers = await prisma.user.count();
          const totalEggs = await prisma.progress.aggregate({
            _sum: {
              totalEggs: true,
              eggsHatched: true
            }
          });

          return {
            totalUsers,
            totalEggs: totalEggs._sum.totalEggs || 0,
            totalEggsHatched: totalEggs._sum.eggsHatched || 0
          };
        },
        this.CRITICAL_OPERATION_RETRY
      );

      logger.info('Global stats fetched successfully', stats);
      return stats;
    } catch (error) {
      logger.error('Error getting global stats', error);
      throw error;
    }
  }

  // Método para cerrar la conexión de Prisma
  static async disconnect() {
    try {
      logger.info('Disconnecting from database');
      await prisma.$disconnect();
      logger.info('Database disconnected successfully');
    } catch (error) {
      logger.error('Error disconnecting from database', error);
      throw error;
    }
  }
} 