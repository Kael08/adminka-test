import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthPublicService } from 'src/domains/auth/public.service';
import { AuthPhoneDto } from './dto/auth-phone.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly service: AuthPublicService
    ) {}

    @Post('/send-code')
    async sendCode(
        @Body() dto: AuthPhoneDto
    ) {
        return await this.service.sendCode(dto.phone)
    }

    @Post('/verify-code')
    async verifyCode(
        @Body() dto:VerifyCodeDto
    ) {
        const jwt = await this.service.verifyCode(dto.phone,dto.code)

        return {jwt:`${jwt}`}
    }


}
