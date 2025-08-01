import { Profile } from '@profile/application/entities/profile';
import { CreateProfileInput } from '@profile/application/interfaces/profileRequest';
import { Hash } from '@shared/utils/functions/password';

export const profileDataMock: CreateProfileInput = {
  name: 'john doe',
  email: 'john.doe@example.com',
  password: 'password',
};

export const profileWithGeneratedPassword = new Profile({
  ...profileDataMock,
  password: new Hash().generateHash(profileDataMock.password),
});
