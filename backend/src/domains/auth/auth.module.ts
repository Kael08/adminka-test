import { Module } from '@nestjs/common';
import { AuthService } from './main/auth.service';
import { AuthPublicService } from './public.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService,AuthPublicService],
  exports: [AuthPublicService],
})
export class AuthModule {}
