import { Module } from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { TournamentsController } from "./tournaments.controller";

import { PrismaModule } from "prisma/prisma.module";
import { PrismaService } from "prisma/prisma.service";

import { UsersModule } from "src/modules/users/users.module";
import { UsersService } from "../users/users.service";

import { TeamsModule } from "../teams/teams.module";
import { TeamsService } from "../teams/teams.service";

@Module({
  imports: [PrismaModule, UsersModule, TeamsModule],
  controllers: [TournamentsController],
  providers: [TournamentsService, PrismaService, UsersService, TeamsService],
  exports: [TournamentsService],
})
export class TournamentsModule {}
