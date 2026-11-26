import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { LlmRequestsModule } from './llm-requests/llm-requests.module';
import { ProvidersModule } from './providers/providers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LlmGatewayModule } from './llm-gateway/llm-gateway.module';

@Module({
  
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule, LlmRequestsModule, ProvidersModule, LlmGatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
