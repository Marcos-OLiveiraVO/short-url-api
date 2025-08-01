import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { CreateProfileLoginUseCase } from '@profile/application/use-cases/createProfileLoginUseCase';
import { AuthenticationService } from '@shared/middleware/auth/authenticationService';
import { ProfileInMemoryRepository } from '../in-MemoryRepository/profileInMemoryRepository';
import { JwtService } from '@nestjs/jwt';
import { profileDataMock, profileWithGeneratedPassword } from '../mockData/profileMockData';
import { NotFoundException } from '@nestjs/common';

let createProfileLoginUseCase: CreateProfileLoginUseCase;
let profileRepository: IProfileRepository;
let authService: AuthenticationService;

describe('Create Profile Login UseCase', () => {
  beforeEach(async () => {
    profileRepository = new ProfileInMemoryRepository();
    authService = new AuthenticationService(new JwtService());
    createProfileLoginUseCase = new CreateProfileLoginUseCase(profileRepository, authService);
  });

  it('should be able to create a Profile Login', async () => {
    await profileRepository.createProfile(profileWithGeneratedPassword);

    const spyAuthService = jest.spyOn(authService, 'execute');

    const credentials = await createProfileLoginUseCase.execute({
      email: profileDataMock.email,
      password: profileDataMock.password,
    });

    expect(spyAuthService).toHaveBeenCalledWith({ profileId: 1, email: profileDataMock.email });
    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(credentials).toMatchObject({
      profileId: 1,
      access_token: expect.any(String),
    });
  });

  it('should not be able to create a Login if the Profile not found', async () => {
    const loginPromise = createProfileLoginUseCase.execute({
      email: profileDataMock.email,
      password: profileDataMock.password,
    });

    await expect(loginPromise).rejects.toEqual(new NotFoundException('Profile not found'));
  });

  it('should not be able to create a Login if the password is incorrect', async () => {
    await profileRepository.createProfile(profileWithGeneratedPassword);

    const loginPromise = createProfileLoginUseCase.execute({
      email: profileDataMock.email,
      password: 'wrong-password',
    });

    await expect(loginPromise).rejects.toEqual(new NotFoundException('Profile not found'));
  });
});
