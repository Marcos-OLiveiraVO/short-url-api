import { BasePagination } from '@shared/utils/interfaces/globalRequest';

export interface ShortenerInput {
  profileId?: number;
  name?: string;
  originalUrl: string;
}

export interface ShortenerViewModelOutput {
  id: number;
  profileId?: number;
  name?: string;
  slug: string;
  originalUrl: string;
  hits?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface GetAllShortenerUrlsInput extends BasePagination {
  profileId: number;
}
