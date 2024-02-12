import { Controller, Get, Param } from "@nestjs/common";
import { RostersService } from "./rosters.service";
import { Prisma, User } from "@prisma/client";

@Controller("rosters")
export class RostersController {
	constructor(private readonly rostersService: RostersService) {}

	@Get(":team_name")
	getTeamRoster(@Param("team_name") team_name: string) {
		return this.rostersService.getTeamRoster(team_name);
	}
}
