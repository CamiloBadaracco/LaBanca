//require('newrelic');
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { setDefaultUser } from "./config/default-user";
var cors = require("cors");
console.log("Main.ts -------------------------- ");
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Main.ts Pasa create------------- ");
  try {
    const config = app.get(ConfigService);
    console.log("Main.ts Pasa app.get--------- ");
    /*  app.connectMicroservice({
      // transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_URL],
        queue: process.env.RABBIT_QUEUE_ADMIN,
        noAck: false,
        prefetchCount: 1,
      },
    });*/

    console.log("Default user main ");
    setDefaultUser(config); //Da de dalta un usuario basico con permisos admin.

    app.use(cors());
    // await app.startAllMicroservicesAsync();
    await app.listen(parseInt(process.env.PORT));
  } catch (err) {
    console.log("Err conection  " + err);
  }
}
bootstrap();
