import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { Prisma } from "@prisma/client";
import { RostersService } from "../rosters/rosters.service";
import { Logger } from "@nestjs/common/services";

@Controller("teams")
export class TeamsController {
	constructor(
		private readonly teamsService: TeamsService,
		private readonly rostersService: RostersService
	) {}

	@Post("create/:user_id")
	create(
		@Body()
		createTeamInput: Prisma.TeamCreateInput,
		@Param("user_id") user_id: string
	) {
		return this.teamsService.createTeam(createTeamInput, user_id);
	}

	@Get("/all")
	findAll() {
		return this.teamsService.findAllTeams();
	}

	@Get(":id")
	findOne(@Param("id") team_name: string) {
		return this.teamsService.findTeamByName(team_name);
	}

	@Get("player/:user_id")
	findTeamsByUserId(@Param("user_id") user_id: string) {
		return this.teamsService.findTeamsByUserId(user_id);
	}

	@Post("join/:user_id/:team_name")
	joinTeam(
		@Param("user_id") user_id: string,
		@Param("team_name") team_name: string
	) {
		return this.rostersService.addPlayerToTeam(user_id, team_name);
	}

	@Patch("update/:id")
	update(
		@Param("id") team_name: string,
		@Body() updateTeamInput: Prisma.TeamUpdateInput
	) {
		return this.teamsService.updateTeam(team_name, updateTeamInput);
	}

	@Delete(":id")
	remove(@Param("id") team_name: string) {
		return this.teamsService.deleteTeam(team_name);
	}
}
