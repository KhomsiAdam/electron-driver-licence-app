export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum SuccessMessages {
  REGISTER_SUCCESS = 'Account created successfully.',
  LOGGED_IN = 'Logged in successfully.',
  LOGGED_OUT = 'Logged out successfully.',
  NOT_LOGGED_IN = 'Not logged in.',
}

export enum ErrorMessages {
  LOGIN_ERROR = 'Unable to login.',
  REGISTER_ERROR = 'User already exists with this email.',
  NOT_AUTHORIZED = 'Not authorized.',
  NOT_AUTHENTICATED = 'Not authenticated.',
  REQUIRED_FIELDS_MISSING = 'Required fields missing.',
}