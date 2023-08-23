import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module"; 
import * as fs from "fs";
import { ExceptionInterceptor } from "@infrastructure/interceptors/exception.interceptor"; 
import { config } from "shared-config/app";
import tracer from './tracer';

async function bootstrap() {
  await tracer.start();
  const app = await NestFactory.create(AppModule);
  const documentOptions = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .addServer(`/${config.PREFIX}`)
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
        scheme: "Bearer",
        type: "http", // I`ve attempted type: 'apiKey' too
        in: "Header",
      },
      "access-token" // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  fs.writeFileSync("./src/swagger-spec/file-server-api-swagger-spec.json",JSON.stringify(document))
  SwaggerModule.setup("/api",app, document);
  const validationOptions = {
    skipMissingProperties: true,
    always: true,
    validationError: { target: true },
    validateCustomDecorators: true
  };
  /*--------------------------------------------*/
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(config.PREFIX);
  app.enableCors();
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document);
  app.useGlobalInterceptors(new ExceptionInterceptor());
  await app.startAllMicroservices();
  await app.listen(config.PORT, () => {
    Logger.log(`Server listening on port ${config.PORT}`, "Bootstrap");
  });
}

bootstrap();
