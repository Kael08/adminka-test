import { Module } from '@nestjs/common'

import { AuthController } from './auth/auth.controller';
import { AuthModule } from 'src/domains/auth/auth.module';
import { UsersModule } from 'src/domains/users/users.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
    ],
    controllers: [
        AuthController,
    ],
})
export class GatewaysModule {}
