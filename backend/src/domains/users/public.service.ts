import { Injectable } from "@nestjs/common"
import { UsersService } from "./main/users.service"
import { TUsers } from "./public.types"
import { UsersEntity } from "./main/entities/users.entity"

@Injectable()
export class UsersPublicService{
    constructor(
        private readonly usersService: UsersService
    ){}

    async upsertPhoneWithCodeHash(phone:string, codeHash: string): Promise<void> {
        const result = await this.usersService.upsertPhoneWithCodeHash(phone,codeHash)
    }

    async verifyCode(phone: string, code: string): Promise<UsersEntity | null>{
        return this.usersService.verifyCode(phone,code)
    }
}