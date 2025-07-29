import { Module } from '@nestjs/common';
import { PrismaService } from './prismaService';

export type Prisma = Awaited<ReturnType<PrismaService['extensions']>>;

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PrismaService,
      useFactory: async (): Promise<Prisma> => {
        return await new PrismaService().extensions();
      },
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
