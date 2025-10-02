import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  realm_access: {
    roles: string[];
  };
}

export interface DecodeTokenProps {
  token?: string;
}

export interface HasRoleProps {
  token: string;
  roles: string[];
}

export type TLoginPayload = {
  email: string;
  password?: string;
};

export type TLoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      full_name: string;
      role: string;
    };
    token: string;
    token_type: string;
    expires_in: number;
  };
};
