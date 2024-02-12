import { Module } from "@nestjs/common";
import { RostersService } from "./rosters.service";
import { RostersController } from "./rosters.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [RostersController],
	providers: [RostersService],
})
export class RostersModule {}
