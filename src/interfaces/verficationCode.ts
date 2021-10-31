export interface IVerificationCodeInsert {
  code: string;
  type: string;

  email: string;
  expiresAt: number;
}

export interface IVerificationCodeGet {
  code: string;
  type: string;

  email?: string;
}
