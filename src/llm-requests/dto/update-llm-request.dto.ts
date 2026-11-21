import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

enum FinalRequestStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    TIMEOUT = 'TIMEOUT',
}

export class UpdateLlmRequestDto {
    @IsEnum(FinalRequestStatus)
    status!: FinalRequestStatus;
}