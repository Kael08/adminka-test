import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(){}

    async sendCode():Promise<string> {
        return "code"
    }
}
