import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { DeleteShortenerUseCase } from '@shortener/application/use-cases/deleteShortenerUseCase';
import { ShortenerInMemoryRepository } from '../in-MemoryRepository/shortenerInMemoryRepository';
import { Shortener } from '@shortener/application/entities/shortener';
import { shortenerEntityMock, shortenerMock } from '../mockData/shortenerMock';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let deleteShortener: DeleteShortenerUseCase;
let shortenerRepository: IShortenerRepository;

describe('Delete Shortener UseCase', () => {
  beforeEach(async () => {
    shortenerRepository = new ShortenerInMemoryRepository();
    deleteShortener = new DeleteShortenerUseCase(shortenerRepository);
  });

  it('should be able to delete a Shortener url if is owner', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'deleteShortenerUrl');
    const createdShortener = await shortenerRepository.createShortenerURL(shortenerEntityMock);

    await deleteShortener.execute({
      slug: shortenerEntityMock.slug,
      profileId: shortenerEntityMock.profileId!,
    });

    const deletedShortener = await shortenerRepository.findShortenerBySlug('hjertl');

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(createdShortener).toBeInstanceOf(Shortener);
    expect(deletedShortener).toHaveProperty('deletedAt', expect.any(Date));
  });

  it('should throw a not found exception if Shortener url not exists', async () => {
    const shortenerDeletePromise = deleteShortener.execute({
      slug: shortenerEntityMock.slug,
      profileId: shortenerEntityMock.profileId!,
    });

    await expect(shortenerDeletePromise).rejects.toEqual(new NotFoundException('Shortener url not found'));
  });

  it('should throw a unauthorized exception if is not owner', async () => {
    await shortenerRepository.createShortenerURL(shortenerEntityMock);

    const shortenerDeletePromise = deleteShortener.execute({
      slug: shortenerEntityMock.slug,
      profileId: 2,
    });

    await expect(shortenerDeletePromise).rejects.toEqual(
      new UnauthorizedException('You are not the owner of this shortener url and cannot delete it'),
    );
  });
});
