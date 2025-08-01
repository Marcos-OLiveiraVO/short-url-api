import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { DeleteProfileUseCase } from '@profile/application/use-cases/deleteProfileUseCase';
import { ProfileInMemoryRepository } from '../in-MemoryRepository/profileInMemoryRepository';
import { profileDataMock } from '../mockData/profileMockData';
import { Profile } from '@profile/application/entities/profile';

let deleteProfileUseCase: DeleteProfileUseCase;
let profileRepository: IProfileRepository;

describe('Delete Profile UseCase', () => {
  beforeEach(async () => {
    profileRepository = new ProfileInMemoryRepository();
    deleteProfileUseCase = new DeleteProfileUseCase(profileRepository);
  });

  it('should be able to delete a Profile', async () => {
    await profileRepository.createProfile(new Profile(profileDataMock));

    const spyDeleteProfile = jest.spyOn(profileRepository, 'deleteProfile');
    const profile = await profileRepository.findProfileByEmail(profileDataMock.email);

    await deleteProfileUseCase.execute(profile?.id!);
    const profileDeleted = await profileRepository.findProfileByEmail(profileDataMock.email);

    expect(spyDeleteProfile).toHaveBeenCalledWith(profile?.id!);
    expect(spyDeleteProfile).toHaveBeenCalledTimes(1);
    expect(profileDeleted).toBeNull();
  });
});
