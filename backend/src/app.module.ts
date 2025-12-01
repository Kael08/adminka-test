import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';

@Module({
  imports: [GatewaysModule],
})
export class AppModule {}