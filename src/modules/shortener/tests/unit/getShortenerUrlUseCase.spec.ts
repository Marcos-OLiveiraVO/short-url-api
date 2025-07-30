import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { GetShortenerUrlUseCase } from '@shortener/application/use-cases/getShortenerUrlUseCase';
import { ShortenerInMemoryRepository } from '../in-MemoryRepository/shortenerInMemoryRepository';
import { shortenerEntityMock } from '../mockData/shortenerMock';
import { NotFoundException } from '@nestjs/common';

let getShortener: GetShortenerUrlUseCase;
let shortenerRepository: IShortenerRepository;

describe('Get Shortener Url UseCase', () => {
  beforeEach(async () => {
    shortenerRepository = new ShortenerInMemoryRepository();
    getShortener = new GetShortenerUrlUseCase(shortenerRepository);
  });

  it('should be able to return a original url and increment one hit', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'findShortenerBySlug');
    const spyRepositoryUpdate = jest.spyOn(shortenerRepository, 'updateShortenerUrlHit');

    await shortenerRepository.createShortenerURL(shortenerEntityMock);

    const url = await getShortener.execute(shortenerEntityMock.slug);

    expect(url).toBe(shortenerEntityMock.originalUrl);
    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(spyRepositoryUpdate).toHaveBeenCalledTimes(1);
  });

  it('should throw a not found exception if Shortener url not exists', async () => {
    const shortenerGetPromise = getShortener.execute(shortenerEntityMock.slug);

    await expect(shortenerGetPromise).rejects.toEqual(new NotFoundException('Shortener url not found'));
  });
});
