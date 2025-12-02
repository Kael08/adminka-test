import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST')!,
        port: +config.get<string>('DB_PORT')!,
        username: config.get<string>('DB_USERNAME')!,
        password: config.get<string>('DB_PASSWORD')!,
        database: config.get<string>('DB_DATABASE')!,
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    GatewaysModule,
  ],
})
export class AppModule {}