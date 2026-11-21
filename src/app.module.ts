import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LlmRequestsModule } from './llm-requests/llm-requests.module';

@Module({
  imports: [PrismaModule, LlmRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
