import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersEntity } from './entities/users.entity'
import { TUsers } from '../public.types'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
    ){}

    async upsertPhoneWithCodeHash(phone: string, codeHash: string): Promise<void>{
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes()+30)

        return this.userRepository.upsert(
            {phone, codeHash, codeExpiresAt: expiresAt },
            ['phone'],
        ).then(()=>{})
    }

    async findOneByPhone(phone: string): Promise<UsersEntity | null>{
        return await this.userRepository.findOneBy({phone})
    }

    async verifyCode(phone:string, code: string): Promise<UsersEntity | null>{
        const user = await this.findOneByPhone(phone)

        if(!user){
            return null
        }

        if(await bcrypt.compare(code,user.codeHash))
            return user
        else return null
    }
}