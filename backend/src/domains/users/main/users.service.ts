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

    async savePhoneAndSendCode(data: TUsers):Promise<UsersEntity>{
        const code=this.generateCode();
        const codeHash = await bcrypt.hash(code,12)

        const expiresAt=new Date();
        expiresAt.setMinutes(expiresAt.getMinutes()+30);

        const user = await this.userRepository.upsert(
        {
            phone: data.phone,
            codeHash,
            codeExpiresAt: expiresAt,
        },
        ['phone'],
        );
        
        console.log(`${code}`)

        return user.identifiers[0] as UsersEntity;
    }

    async verifyCode(phone: string, code: string): Promise<UsersEntity> {
        const user = await this.userRepository.findOne({
            where: { phone },
            select: ['id', 'phone', 'codeHash', 'codeExpiresAt'],
        });

        if (!user?.codeHash || !user.codeExpiresAt) {
            throw new Error('Код не найден');
        }

        if (new Date() > user.codeExpiresAt) {
            throw new Error('Код просрочен');
        }

        const isValid = await bcrypt.compare(code, user.codeHash);
        if (!isValid) {
            throw new Error('Неверный код');
        }

        await this.userRepository.update(user.id, {
            codeHash: null,
            codeExpiresAt: null,
        });

        return { ...user, codeHash: null, codeExpiresAt: null };
    }

    async findOneByPhone(phone: string): Promise<UsersEntity | null>{
        return await this.userRepository.findOneBy({phone})
    }

    private generateCode():string{
        return String(Math.floor(1000+Math.random()*9000))
    }
}