import {IsString, IsNotEmpty} from 'class-validator'

export class VerifyCodeDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}