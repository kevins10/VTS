import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ConfigService } from "@nestjs/config";
import { session } from "passport";
import { SESSION_SECRET } from "./auth/secrets";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  // OpenAPI (Swagger) setup
  const config = new DocumentBuilder()
    .setTitle("Valorant Tournament System") // TODO: rename to app name
    .setDescription("API endpoints for Valorant Tournament System")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api`, app, document);

  app.enableCors({
    origin: process.env.CLIENT_ADDRESS,
    allowedHeaders: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

// const { Server } = require("socket.io");

// const io = new Server({
//   cors: {
//     origin: "http://localhost:4000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user connected");

//   socket.on("message", (msg) => {
//     console.log("message received:", msg);
//     // socket.join(msg.data.lobby_id)
//     io.to(msg.data.lobby_id).emit(
//       "message",
//       `${msg.data.from}: ${msg.data.message}`
//     );
//   });

//   socket.on("join_lobby", (msg) => {
//     socket.join(msg.data.lobby_id);
//     console.log("user joined this lobby: ", msg.data.lobby_id);
//     io.to(msg.data.lobby_id).emit(
//       "message",
//       `${msg.data.username} joined the lobby`
//     );
//   });
// });

// io.listen(5000);
