import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroqService } from './groq.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProviderHealthService {
    private readonly logger = new Logger(ProviderHealthService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly groqService: GroqService,
    ) {}

    async checkGroqHealth() {
        const provider = await this.prisma.llmProvider.findUnique({
            where: { name: 'groq' },
        });

        if(!provider) {
            throw new NotFoundException('Groq provider is not registered')
        }
        const isHealthy = await this.groqService.checkHealth();

        const updatedProvider = await this.prisma.llmProvider.update({
            where: { id: provider.id },
            data: {
                healthStatus: isHealthy? 'HEALTHY' : 'UNHEALTHY',
                lastHealthCheckAt: new Date(),
                lastHealthError: isHealthy ? null : 'Groq health check failed',
            },
        });

        return updatedProvider;
    }

    @Cron(CronExpression.EVERY_5_MINUTES, {
        name: 'groq-hea;th-check',
        waitForCompletion: true,
    })
    async monitorGroqHealth() {
        const provider = await this.checkGroqHealth();

        this.logger.log(
            `Groq health check completed: ${provider.healthStatus}`,
        );
    }
}
