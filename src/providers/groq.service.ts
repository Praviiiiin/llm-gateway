import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class GroqService {
    private readonly groq: Groq;

    constructor() {
        const apiKey = process.env.GROQ_API_KEY;

        if(!apiKey) {
            throw new Error('GROK API KEY is not defined');
        }

        this.groq = new Groq({
            apiKey: apiKey,
        })
    }

    async generateResponse(prompt: string) {
        const completion = await this.groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt
                },
            ],
            model: 'llama-3.3-70b-versatile'
        });

        return {
            response: completion.choices[0].message.content,
            model: completion.model,
            usage: completion.usage,
        };
    }
}
