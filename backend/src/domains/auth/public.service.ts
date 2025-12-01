import { Injectable } from "@nestjs/common";
import { AuthService } from "./main/auth.service";

@Injectable()
export class AuthPublicService{
    constructor(
        private readonly authService: AuthService
    ){}

    async sendCode(): Promise<string>{
        return await this.authService.sendCode()
    }
}