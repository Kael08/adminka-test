import { 
    Injectable,
    UnauthorizedException,
 } from '@nestjs/common';
import { UsersPublicService } from 'src/domains/users/public.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersPublicService: UsersPublicService,
        private readonly jwtService: JwtService,
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

    async verifyCode(phone: string, code: string): Promise<string>{
        const user = await this.usersPublicService.verifyCode(phone,code)

        if(!user){
            throw new UnauthorizedException('Invalid or expired code')
        }

        const payload = {
            id: user.id,
            phone: user.phone
        }

        const accessToken = this.jwtService.sign(payload, {})

        return accessToken
    }

    private generateCode():string{
        return String(Math.floor(1000+Math.random()*9000))
    }
}
