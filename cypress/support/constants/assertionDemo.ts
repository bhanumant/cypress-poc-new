export const ASSERTION_DEMO_DATA = {
  urlSubstrings: {
    loginPath: 'auth/login',
    domain: 'orangehrmlive',
    notDashboard: 'dashboard',
  },
  loginTitle: 'Login',
  loginTitlePartial: 'Log',
  usernamePlaceholder: 'Username',
  logoClass: 'orangehrm-login-logo',
  expectedInputCount: 3,
  titleRegex: /^L/,
} as const;
