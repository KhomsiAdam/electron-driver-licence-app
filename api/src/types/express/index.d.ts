declare namespace Express {
  interface Request {
    user: any;
    role: string;
  }
}

declare module 'xss-clean' {
  const value: Function
  export default value
}