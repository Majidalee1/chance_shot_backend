// export interface IUSERLOGIN
export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserRegister {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
  isActive: boolean;
  role?: string;
}

// IForgot password
export interface IForgotPassword {
  email: string;
}

// verify code
export interface IVerifyCode {
  email: string;
  code: string;
  password?: string;
}
