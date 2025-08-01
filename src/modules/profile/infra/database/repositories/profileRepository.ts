import { Injectable } from '@nestjs/common';
import { Profile } from '@profile/application/entities/profile';
import { IProfileRepository } from '@profile/application/interfaces/IProfileRepository';
import { FindProfileByEmailOutput } from '@profile/application/interfaces/profileRequest';
import { ProfileMapper } from '@profile/infra/adapters/mappers/profileMapper';
import { PrismaService } from '@shared/database/prismaService';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: Profile): Promise<void> {
    await this.prisma.profile.create({
      data: ProfileMapper.toDatabase(data),
    });
  }

  async deleteProfile(profileId: number): Promise<void> {
    await this.prisma.profile.deleteMany({
      where: { id: profileId },
    });

    await this.prisma.shortUrl.deleteMany({
      where: { profileId: profileId },
    });
  }

  async findProfileByEmail(email: string): Promise<FindProfileByEmailOutput | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { email: email },
      select: {
        password: true,
        id: true,
        email: true,
      },
    });

    if (!profile) {
      return null;
    }

    return profile;
  }
}
