import { profile } from '@prisma/client';
import { SignInResponse } from '@shared/middleware/auth/interfaces/authenticationRequest';

export interface CreateProfileInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateProfileLoginInput {
  email: string;
  password: string;
}

export interface FindProfileByEmailOutput extends Omit<profile, 'name' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export interface CreateProfileLoginOutput {
  access_token: SignInResponse['access_token'];
  profileId: number;
}

export interface ProfileViewModelOutput {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
