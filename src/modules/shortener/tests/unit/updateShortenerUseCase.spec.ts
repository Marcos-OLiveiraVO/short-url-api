import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { UpdateShortenerUseCase } from '@shortener/application/use-cases/updateShortenerUseCase';
import { ShortenerInMemoryRepository } from '../in-MemoryRepository/shortenerInMemoryRepository';
import { shortenerEntityMock, UpdateShortenerMock } from '../mockData/shortenerMock';
import { Shortener } from '@shortener/application/entities/shortener';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let updateShortener: UpdateShortenerUseCase;
let shortenerRepository: IShortenerRepository;

describe('Update Shortener UseCase', () => {
  beforeEach(async () => {
    shortenerRepository = new ShortenerInMemoryRepository();
    updateShortener = new UpdateShortenerUseCase(shortenerRepository);
  });

  it('should be able to update a Shortener url if is owner', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'updateShortenerUrl');
    const createdShortener = await shortenerRepository.createShortenerURL(shortenerEntityMock);

    const updatedShortener = await updateShortener.execute(UpdateShortenerMock);

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(createdShortener).toBeInstanceOf(Shortener);
    expect(updatedShortener).toHaveProperty('originalUrl', 'https://www.google.com');
  });

  it('should throw a not found exception if Shortener url not exists', async () => {
    const shortenerUpdatePromise = updateShortener.execute(UpdateShortenerMock);

    await expect(shortenerUpdatePromise).rejects.toEqual(new NotFoundException('Shortener url not found'));
  });

  it('should throw a unauthorized exception if is not owner', async () => {
    await shortenerRepository.createShortenerURL(shortenerEntityMock);

    const shortenerUpdatePromise = updateShortener.execute({
      ...UpdateShortenerMock,
      profileId: 2,
    });

    await expect(shortenerUpdatePromise).rejects.toEqual(
      new UnauthorizedException('You are not the owner of this shortener url and cannot update it'),
    );
  });
});
