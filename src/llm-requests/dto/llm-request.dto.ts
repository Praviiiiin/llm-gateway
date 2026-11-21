import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLlmRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    model!: string;
}