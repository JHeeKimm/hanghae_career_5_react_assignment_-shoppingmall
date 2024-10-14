export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  uid: string;
  email: string;
  displayName?: string;
  accessToken: string;
}
