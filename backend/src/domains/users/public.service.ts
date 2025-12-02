import { Injectable } from "@nestjs/common"
import { UsersService } from "./main/users.service"
import { TUsers } from "./public.types"

@Injectable()
export class UsersPublicService{
    constructor(
        private readonly usersService: UsersService
    ){}

    async upsertPhoneWithCodeHash(phone:string, codeHash: string): Promise<void> {
        const result = await this.usersService.upsertPhoneWithCodeHash(phone,codeHash)
    }
}