import { Injectable } from "@nestjs/common";
import { AuthService } from "./main/auth.service";

@Injectable()
export class AuthPublicService{
    constructor(
        private readonly authService: AuthService,
    ){}

    async sendCode(phone: string): Promise<{message: string}>{
        return await this.authService.sendCode(phone)
    }

    async verifyCode(phone:string,code:string): Promise<string>{
        return await this.authService.verifyCode(phone,code)
    }
}