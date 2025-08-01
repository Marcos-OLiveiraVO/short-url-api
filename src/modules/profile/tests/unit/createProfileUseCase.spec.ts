import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { CreateProfileUseCase } from '@profile/application/use-cases/createProfileUseCase';
import { ProfileInMemoryRepository } from '../in-MemoryRepository/profileInMemoryRepository';
import { Profile } from '@profile/application/entities/profile';
import { profileDataMock } from '../mockData/profileMockData';
import { ConflictException } from '@nestjs/common';

let createProfileUseCase: CreateProfileUseCase;
let profileRepository: IProfileRepository;

describe('Create Profile UseCase', () => {
  beforeEach(async () => {
    profileRepository = new ProfileInMemoryRepository();
    createProfileUseCase = new CreateProfileUseCase(profileRepository);
  });

  it('should be able to create a Profile', async () => {
    const spyCreateProfile = jest.spyOn(profileRepository, 'createProfile');
    await createProfileUseCase.execute(profileDataMock);

    const profile = await profileRepository.findProfileByEmail(profileDataMock.email);

    expect(spyCreateProfile).toHaveBeenCalledWith(expect.any(Profile));
    expect(spyCreateProfile).toHaveBeenCalledTimes(1);
    expect(profile?.email).toBe(profileDataMock.email);
  });

  it('should not be able to create a Profile with same email', async () => {
    await createProfileUseCase.execute(profileDataMock);
    await expect(createProfileUseCase.execute(profileDataMock)).rejects.toEqual(new ConflictException('Profile already exists'));
  });
});
