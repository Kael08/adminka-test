import { Module } from '@nestjs/common';
import { AuthService } from './main/auth.service';
import { AuthPublicService } from './public.service';

@Module({
  providers: [AuthService,AuthPublicService],
  exports: [AuthPublicService],
})
export class AuthModule {}
