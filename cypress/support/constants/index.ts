import { LOGIN_ASSERTIONS } from './login';

export * from './urls';
export * from './login';
export * from './assertionDemo';
export * from './navigationDemo';
export * from './webdriverUniversity';
export * from './otp';
export * from './testData';



// Backward compatible mapping for older specs
export const ASSERTION_TEXT = {
  loginError: LOGIN_ASSERTIONS.error,
} as const;
