import {IsString, IsNotEmpty} from 'class-validator'

export class AuthPhoneDto {
    @IsNotEmpty()
    @IsString()
    phone: string
}