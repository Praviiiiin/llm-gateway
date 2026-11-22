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
}
