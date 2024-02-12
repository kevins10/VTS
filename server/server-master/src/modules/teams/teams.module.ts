import { Module } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { PrismaModule } from "prisma/prisma.module";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { RostersModule } from "../rosters/rosters.module";
import { RostersService } from "../rosters/rosters.service";

@Module({
	imports: [PrismaModule, RostersModule],
	controllers: [TeamsController],
	providers: [TeamsService, RostersService, PrismaService],
	exports: [TeamsService],
})
export class TeamsModule {}
