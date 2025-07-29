import { profile } from '@prisma/client';

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
