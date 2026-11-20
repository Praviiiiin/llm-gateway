import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async checkDatabase () {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: 'success',
      database: 'connected',
      message: 'PostgreSQL connection is working'
    };
  }
}
