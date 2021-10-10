import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from './agent/infrastructure/modules/agent.module';
import { typeOrmConfig } from './config/typeorm.config';
import 'reflect-metadata';
import { UserModule } from './user/infrastructure/modules/user.module';
import { SubAgent } from './subAgent/domain/subAgent.entity';
import { Address } from './address/domain/address.entity';
//import { MailModule } from './mail/infrastructure/modules/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    AgentModule,
    UserModule,
    SubAgent,
    Address
   // MailModule,
  ],
})
export class AppModule {}
