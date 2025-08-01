import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { GetProfileUseCase } from '@profile/application/use-cases/getProfileUseCase';
import { ProfileInMemoryRepository } from '../in-MemoryRepository/profileInMemoryRepository';
import { profileDataMock } from '../mockData/profileMockData';
import { Profile } from '@profile/application/entities/profile';

let getProfileUseCase: GetProfileUseCase;
let profileRepository: IProfileRepository;

describe('Get Profile UseCase', () => {
  beforeEach(async () => {
    profileRepository = new ProfileInMemoryRepository();
    getProfileUseCase = new GetProfileUseCase(profileRepository);
  });

  it('should be able to get a Profile', async () => {
    await profileRepository.createProfile(new Profile(profileDataMock));

    const spyGetProfile = jest.spyOn(profileRepository, 'findProfileById');
    const profile = await getProfileUseCase.execute(1);

    expect(profile?.email).toBe(profileDataMock.email);
    expect(spyGetProfile).toHaveBeenCalledWith(1);
    expect(spyGetProfile).toHaveBeenCalledTimes(1);
  });

  it('should be able to return null if Profile not found', async () => {
    const spyGetProfile = jest.spyOn(profileRepository, 'findProfileById');
    const profile = await getProfileUseCase.execute(1);

    expect(profile).toBeNull();
    expect(spyGetProfile).toHaveBeenCalledWith(1);
    expect(spyGetProfile).toHaveBeenCalledTimes(1);
  });
});
