import { Controller, Get, Body } from '@nestjs/common';
import { AuthPublicService } from 'src/domains/auth/public.service';
import { AuthPhoneDto } from './dto/auth-phone.dto';

@Controller('/auth/send-code')
export class AuthController {
    constructor(
        private readonly service: AuthPublicService
    ) {}

    @Get()
    async sendCode(
        @Body() dto: AuthPhoneDto
    ) {
        return await this.service.sendCode(dto.phone)
    }
}
