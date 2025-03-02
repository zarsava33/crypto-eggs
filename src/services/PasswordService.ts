import bcrypt from 'bcryptjs';
import { LoggerService } from './LoggerService';

const logger = LoggerService.getInstance();

export class PasswordService {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hashea una contraseña usando bcrypt
   * @param password La contraseña en texto plano
   * @returns La contraseña hasheada
   */
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      logger.error('Error hashing password', error);
      throw new Error('Error al procesar la contraseña');
    }
  }

  /**
   * Verifica si una contraseña coincide con su hash
   * @param password La contraseña en texto plano
   * @param hashedPassword El hash de la contraseña almacenado
   * @returns true si la contraseña coincide, false en caso contrario
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error('Error verifying password', error);
      throw new Error('Error al verificar la contraseña');
    }
  }

  /**
   * Valida que una contraseña cumpla con los requisitos mínimos de seguridad
   * @param password La contraseña a validar
   * @returns true si la contraseña es válida, false en caso contrario
   */
  static validatePassword(password: string): boolean {
    // Mínimo 8 caracteres
    if (password.length < 8) return false;

    // Al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) return false;

    // Al menos una letra minúscula
    if (!/[a-z]/.test(password)) return false;

    // Al menos un número
    if (!/[0-9]/.test(password)) return false;

    // Al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

    return true;
  }
} 