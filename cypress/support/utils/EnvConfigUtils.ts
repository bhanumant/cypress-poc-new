export interface EnvironmentConfig {
  envName: string;
  baseUrl: string;
  apiBaseUrl: string;
  adminUser: string;
  secretKey: string;
}

export class EnvConfigUtils {
  private static envConfigs: Record<string, EnvironmentConfig> = {
    staging: {
      envName: 'staging',
      baseUrl: 'https://webdriveruniversity.com',
      apiBaseUrl: 'https://jsonplaceholder.typicode.com',
      adminUser: 'staging_qa_admin',
      secretKey: 'STAGING_SEC_KEY_9988',
    },
    dev: {
      envName: 'dev',
      baseUrl: 'https://webdriveruniversity.com',
      apiBaseUrl: 'https://jsonplaceholder.typicode.com',
      adminUser: 'dev_qa_user',
      secretKey: 'DEV_SEC_KEY_1122',
    },
    prod: {
      envName: 'prod',
      baseUrl: 'https://webdriveruniversity.com',
      apiBaseUrl: 'https://jsonplaceholder.typicode.com',
      adminUser: 'prod_read_user',
      secretKey: 'PROD_SEC_KEY_7744',
    },
  };

  /**
   * Retrieves active environment configuration object based on Cypress env target.
   * 
   * @param targetEnv Optional explicit env override name ('staging' | 'dev' | 'prod')
   * @returns EnvironmentConfig object
   */
  static getEnvConfig(targetEnv?: string): EnvironmentConfig {
    const activeEnv = targetEnv || Cypress.env('ENV') || Cypress.env('env') || 'staging';
    return this.envConfigs[activeEnv.toLowerCase()] || this.envConfigs['staging'];
  }

  /**
   * Masks sensitive credentials for safe UI logging.
   * 
   * @param secret Sensitive secret string
   * @returns Masked string
   */
  static maskSecret(secret: string): string {
    if (!secret) return '********';
    if (secret.length <= 4) return '****';
    return `${secret.substring(0, 3)}${'*'.repeat(secret.length - 4)}${secret.substring(secret.length - 1)}`;
  }
}
