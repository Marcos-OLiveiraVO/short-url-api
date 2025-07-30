import { ShortenerInput } from '@shortener/application/interfaces/shortenerRequest';

export const shortenerMock: ShortenerInput = {
  name: 'My blog',
  originalUrl: 'https://example.com/blog',
};

export const shortenerWithProfileMock: ShortenerInput = {
  name: 'My blog',
  profileId: 1,
  originalUrl: 'https://example.com/blog',
};
