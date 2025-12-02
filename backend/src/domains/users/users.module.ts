import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './main/users.service';
import { UsersPublicService } from './public.service';
import { UsersEntity } from './main/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  providers: [UsersService, UsersPublicService],
  exports: [UsersPublicService],
})

export class UsersModule {}