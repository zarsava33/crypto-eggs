import { LoggerService } from './LoggerService';

const logger = LoggerService.getInstance();

interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryableErrors?: Array<string | RegExp>;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 segundo
  maxDelay: 10000,    // 10 segundos
  backoffFactor: 2,
  retryableErrors: [
    'PrismaClientKnownRequestError',
    'PrismaClientRustPanicError',
    'PrismaClientInitializationError',
    /connection.*lost/i,
    /deadlock/i,
    /timeout/i
  ]
};

export class RetryService {
  static async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const finalOptions = { ...DEFAULT_OPTIONS, ...options };
    let lastError: Error | null = null;
    let delay = finalOptions.initialDelay;

    for (let attempt = 1; attempt <= finalOptions.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (!this.isRetryableError(error, finalOptions.retryableErrors)) {
          logger.error('Non-retryable error occurred', error);
          throw error;
        }

        if (attempt === finalOptions.maxAttempts) {
          logger.error(`All retry attempts failed after ${attempt} tries`, error);
          throw error;
        }

        logger.warn('Operation failed, retrying...', {
          attempt,
          nextAttemptIn: delay,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        await this.sleep(delay);
        delay = Math.min(
          delay * finalOptions.backoffFactor,
          finalOptions.maxDelay
        );
      }
    }

    throw lastError || new Error('Retry failed for unknown reason');
  }

  private static isRetryableError(error: unknown, retryableErrors: Array<string | RegExp>): boolean {
    if (!(error instanceof Error)) return false;

    return retryableErrors.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(error.message) || pattern.test(error.name);
      }
      return error.name === pattern || error.constructor.name === pattern;
    });
  }

  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 