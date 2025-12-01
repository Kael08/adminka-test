import { Controller, Get } from '@nestjs/common';
import { AuthPublicService } from 'src/domains/auth/public.service';

@Controller('/auth/send-code')
export class AuthController {
    constructor(
        private readonly service: AuthPublicService
    ) {}

    @Get()
    async sendCode(){
        return{
            code: await this.service.sendCode()
        }
    }
}
