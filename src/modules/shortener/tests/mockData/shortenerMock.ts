import { Shortener } from '@shortener/application/entities/shortener';
import { ShortenerInput, UpdateShortenerInput } from '@shortener/application/interfaces/shortenerRequest';

export const shortenerMock: ShortenerInput = {
  name: 'My blog',
  originalUrl: 'https://example.com/blog',
};

export const shortenerWithProfileMock: ShortenerInput = {
  name: 'My blog',
  profileId: 1,
  originalUrl: 'https://example.com/blog',
};

export const shortenerEntityMock = new Shortener({
  ...shortenerMock,
  slug: 'hjertl',
  profileId: 1,
});

export const UpdateShortenerMock: UpdateShortenerInput = {
  slug: shortenerEntityMock.slug,
  profileId: shortenerEntityMock.profileId!,
  originalUrl: 'https://www.google.com',
};

export const shortenerEntityMockTwo = new Shortener({
  ...shortenerEntityMock.props,
  slug: 'hje21e',
  profileId: 1,
});
