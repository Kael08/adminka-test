import {IsString} from 'class-validator'

export class AuthPhoneDto {
    @IsString()
    phone: string
}