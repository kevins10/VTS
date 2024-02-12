import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/passport/jwt-Auth.guard";
import { TournamentsModule } from "./modules/tournaments/tournaments.module";
import { TeamsModule } from "./modules/teams/teams.module";
import { PrismaService } from "prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";
import { LobbiesService } from "./modules/lobbies/lobbies.service";
import { LobbiesModule } from "./modules/lobbies/lobbies.module";
import { RostersModule } from "./modules/rosters/rosters.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TournamentsModule,
    TeamsModule,
    RostersModule,
    LobbiesModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    // 	provide: APP_GUARD,
    // 	useExisting: JwtAuthGuard,
    // },
    // JwtAuthGuard,
  ],
})
export class AppModule {}
