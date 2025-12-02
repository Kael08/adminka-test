import { Injectable } from '@nestjs/common';
import { UsersPublicService } from 'src/domains/users/public.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersPublicService: UsersPublicService,
    ){}

    async sendCode(phone: string):Promise<{message: string}> {
        const code = this.generateCode()
        const hash = await bcrypt.hash(code,12)

        await this.usersPublicService.upsertPhoneWithCodeHash(phone,hash)

        console.log(`code:${code}`)

        return {
            message: 'Code has been sent'
        }
    }

    async verifyCode(): Promise<string>{
        return "code"
    }

    private generateCode():string{
        return String(Math.floor(1000+Math.random()*9000))
    }
}
