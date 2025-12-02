import { Module } from '@nestjs/common';
import { AuthService } from './main/auth.service';
import { AuthPublicService } from './public.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Используйте переменную окружения
    }),
    UsersModule,
  ],
  providers: [AuthService,AuthPublicService],
  exports: [AuthPublicService],
})
export class AuthModule {}
