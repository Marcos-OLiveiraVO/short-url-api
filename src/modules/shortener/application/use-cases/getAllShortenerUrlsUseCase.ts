import { Injectable } from '@nestjs/common';
import { IShortenerRepository } from '../interfaces/IShortenerRepository';
import { GetAllShortenerUrlsInput } from '../interfaces/shortenerRequest';
import { Pagination } from '@shared/utils/interfaces/globalRequest';
import { Shortener } from '../entities/shortener';

@Injectable()
export class GetAllShortenerUrlsUseCase {
  constructor(private shortenerRepository: IShortenerRepository) {}

  async execute(data: GetAllShortenerUrlsInput): Promise<Pagination<Shortener>> {
    return await this.shortenerRepository.findAllShortenersUrls(data);
  }
}
