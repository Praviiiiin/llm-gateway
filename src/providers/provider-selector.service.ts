import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProviderSelectorService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async selectProvider() {
        const provider = await this.prisma.llmProvider.findFirst({
            where: {
                status: 'ACTIVE',
                healthStatus: 'HEALTHY',
            },
        });

        if(!provider) {
            throw new ServiceUnavailableException(
                'No healthy LLM provider is currently available'
            );
        }

        return provider;
    }
}
