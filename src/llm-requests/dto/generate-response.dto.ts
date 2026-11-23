import { IsEmpty, IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class generateResponseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(10000)
    prompt!: string;
}