import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLlmRequestDto } from './dto/update-llm-request.dto';

@Injectable()
export class LlmRequestsService {
    constructor(private readonly prisma: PrismaService) {}

    async createPendingRequest(model: string) {
        return this.prisma.llmRequest.create({
            data: {
                model: model,
                status: 'PENDING',
            },
        });
    }

    async updateRequest(id: string, data: UpdateLlmRequestDto) {
        return this.prisma.llmRequest.update({
            where: {
                id: id,
            },
            data: data
        });
    }
}
