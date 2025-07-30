import { shortenerMock, shortenerWithProfileMock } from '../mockData/shortenerMock';
import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { CreateShortenerUseCase } from '@shortener/application/use-cases/createShortenerUseCase';
import { ShortenerInMemoryRepository } from '../in-MemoryRepository/shortenerInMemoryRepository';
import { Shortener } from '@shortener/application/entities/shortener';
import { nanoid } from 'nanoid';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'hjertl'),
}));

let shortenerRepository: IShortenerRepository;
let createShortenerUseCase: CreateShortenerUseCase;

describe('Create Shortener UseCase', () => {
  beforeEach(async () => {
    shortenerRepository = new ShortenerInMemoryRepository();
    createShortenerUseCase = new CreateShortenerUseCase(shortenerRepository);
  });

  it('should be able to create a Shortener url without profile', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'createShortenerURL');

    const createdShortener = await createShortenerUseCase.execute(shortenerMock);

    expect(createdShortener).toBeInstanceOf(Shortener);
    expect(createdShortener?.originalUrl).toBe(shortenerMock.originalUrl);
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });

  it('should be able to create a Shortener url with profile', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'createShortenerURL');

    const createdShortener = await createShortenerUseCase.execute(shortenerWithProfileMock);

    expect(createdShortener).toBeInstanceOf(Shortener);
    expect(createdShortener?.profileId).toBe(shortenerWithProfileMock.profileId);
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });

  it('should generate a new slug if a duplicate slug is found', async () => {
    jest
      .spyOn(shortenerRepository, 'findShortenerBySlug')
      .mockImplementationOnce(async () => new Shortener({ ...shortenerMock, slug: 'hjertl' }))
      .mockImplementation(async () => null);

    const result = await createShortenerUseCase.execute(shortenerMock);

    expect(result.slug).toBe('hjertl');
    expect(nanoid).toHaveBeenCalled();
  });
});
