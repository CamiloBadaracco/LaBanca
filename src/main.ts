require('newrelic');
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: process.env.RABBIT_QUEUE_ADMIN,
      noAck: false,
      prefetchCount: 1,
    },
  });
  app.use(cors());
  await app.startAllMicroservicesAsync();
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();  
