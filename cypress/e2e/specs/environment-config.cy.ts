import { EnvConfigUtils } from '../../support/utils/EnvConfigUtils';

describe('Multi-Environment Switching & Secret Management Suite [@env, @enterprise, @sanity]', () => {
  it('should load environment configuration dynamically for Staging target [@env, @smoke]', () => {
    const config = EnvConfigUtils.getEnvConfig('staging');

    expect(config.envName).to.eq('staging');
    expect(config.baseUrl).to.include('webdriveruniversity.com');
    expect(config.adminUser).to.include('staging');
  });

  it('should switch configuration dynamically for Dev target [@env, @regression]', () => {
    const devConfig = EnvConfigUtils.getEnvConfig('dev');

    expect(devConfig.envName).to.eq('dev');
    expect(devConfig.adminUser).to.include('dev');
  });

  it('should mask sensitive secret keys and API tokens in test log outputs [@env, @sanity]', () => {
    const config = EnvConfigUtils.getEnvConfig('staging');
    const maskedKey = EnvConfigUtils.maskSecret(config.secretKey);

    // Verify secret is properly masked for UI log reporting
    expect(maskedKey).to.not.eq(config.secretKey);
    expect(maskedKey).to.include('*');
    cy.log(`[Env Config Log] Active Admin User: ${config.adminUser}, Masked Secret: ${maskedKey}`);
  });
});
