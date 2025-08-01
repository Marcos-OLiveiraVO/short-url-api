import { Profile } from '../entities/profile';
import { FindProfileByEmailOutput } from './profileRequest';

export abstract class IProfileRepository {
  abstract createProfile(data: Profile): Promise<void>;
  abstract deleteProfile(profileId: number): Promise<void>;
  abstract findProfileByEmail(email: string): Promise<FindProfileByEmailOutput | null>;
}
