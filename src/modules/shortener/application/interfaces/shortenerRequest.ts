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
