import { Module } from '@nestjs/common'

import { AuthController } from './auth/auth.controller';
import { AuthModule } from 'src/domains/auth/auth.module';

@Module({
    imports: [
        AuthModule,
    ],
    controllers: [
        AuthController,
    ],
})
export class GatewaysModule {}
