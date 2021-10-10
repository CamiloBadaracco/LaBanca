import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from './agent/infrastructure/modules/agent.module';
import { typeOrmConfig } from './config/typeorm.config';
import 'reflect-metadata';
//import { MailModule } from './mail/infrastructure/modules/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(),
    AgentModule,
   // MailModule,
  ],
})
export class AppModule {}
