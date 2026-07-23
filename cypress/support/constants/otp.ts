export const OTP_URLS = {
  otpDemoPage: 'https://webdriveruniversity.com/Contact-Us/contactus.html',
  apiSendOtp: '/api/v1/auth/send-otp',
  apiVerifyOtp: '/api/v1/auth/verify-otp',
} as const;

export const OTP_ASSERTIONS = {
  dummyPhone: '+1-555-019-2834',
  dummyEmail: 'automation.user@example.com',
  validOtp: '849201',
  invalidOtp: '000000',
  messages: {
    otpSentSuccess: 'OTP has been sent successfully to your mobile number.',
    verificationSuccess: 'OTP verification successful! Access granted.',
    invalidOtpError: 'Invalid OTP code entered. Please try again.',
    resendSuccess: 'A new OTP code has been dispatched.',
  },
} as const;

export const GMAIL_AUTH = {
  user: {
    firstName: 'Alex',
    lastName: 'Automation',
    gmailAddress: 'automation.user@gmail.com',
    password: 'Password123!',
  },
  messages: {
    otpSentToGmail: 'A 6-digit verification code has been dispatched to automation.user@gmail.com',
    accountActivated: 'Account successfully activated! Welcome to the portal.',
    invalidCodeError: 'Invalid or expired Gmail verification code. Please request a new code.',
  },
} as const;
