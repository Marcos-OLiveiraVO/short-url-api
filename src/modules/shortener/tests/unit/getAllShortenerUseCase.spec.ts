import { IShortenerRepository } from '@shortener/application/interfaces/IShortenerRepository';
import { GetAllShortenerUseCase } from '@shortener/application/use-cases/getAllShortenerUseCase';
import { ShortenerInMemoryRepository } from '../in-MemoryRepository/shortenerInMemoryRepository';
import { shortenerEntityMock, shortenerEntityMockTwo } from '../mockData/shortenerMock';

let getAllShortener: GetAllShortenerUseCase;
let shortenerRepository: IShortenerRepository;

describe('Get All Shortener UseCase', () => {
  beforeEach(async () => {
    shortenerRepository = new ShortenerInMemoryRepository();
    getAllShortener = new GetAllShortenerUseCase(shortenerRepository);
  });

  it('should be able to return all Shortener urls if is owner', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'findAllShortenersUrls');

    const createdShortener = await shortenerRepository.createShortenerURL(shortenerEntityMock);

    const urls = await getAllShortener.execute({
      profileId: shortenerEntityMock.profileId!,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(urls).toMatchObject({
      data: [expect.objectContaining(createdShortener)],
      metadata: {
        currentPage: 1,
        limitPerPage: 10,
        totalPages: 1,
        totalItems: 1,
        totalItemsOnThisPage: 1,
      },
    });
  });

  it('should be able to return the correctly page and limit', async () => {
    const spyRepository = jest.spyOn(shortenerRepository, 'findAllShortenersUrls');

    await shortenerRepository.createShortenerURL(shortenerEntityMock);
    const secondShortener = await shortenerRepository.createShortenerURL(shortenerEntityMockTwo);

    const urls = await getAllShortener.execute({
      profileId: shortenerEntityMock.profileId!,
      page: 2,
      limit: 1,
    });

    expect(spyRepository).toHaveBeenCalledTimes(1);
    expect(urls).toMatchObject({
      data: [expect.objectContaining(secondShortener)],
      metadata: {
        currentPage: 2,
        limitPerPage: 1,
        totalPages: 2,
        totalItems: 2,
        totalItemsOnThisPage: 1,
      },
    });
  });
});
