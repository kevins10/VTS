import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { TournamentsService } from "./tournaments.service";
import { UsersService } from "../users/users.service";
import { Prisma, Team } from "@prisma/client";
import { TeamsService } from "../teams/teams.service";
@Controller("tournaments")
export class TournamentsController {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly usersService: UsersService,
    private teamsService: TeamsService
  ) {}

  @Post("create/:id")
  createTournament(
    @Body() createTournamentInput: Prisma.TournamentCreateInput,
    @Param("id") organizer_id: string
  ) {
    return this.tournamentsService.createTournament(
      createTournamentInput,
      organizer_id
    );
  }

  // @Get("all/:args")
  // getAllTournaments(@Param("args") args?: string) {
  // 	return this.tournamentsService.findAllTournaments();
  // }

  @Get("all")
  getAllTournaments() {
    return this.tournamentsService.findAllTournaments();
  }

  @Get(":id")
  getTournamentById(@Param("id", ParseIntPipe) id: number) {
    return this.tournamentsService.findTournamentById(id);
  }

  @Put("join/:id")
  async joinTournament(
    @Body() team_name: any,
    @Param("id", ParseIntPipe) tournament_id: number
  ) {
    var team: Team;
    var res = await this.tournamentsService
      .getTeam(team_name.team_name)
      .then(function (response) {
        // redirect user to their homepage
        team = response;
      })
      .catch(function (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            const errorMsg = error.response.data.message;
          }
        }
      });

    return await this.tournamentsService.addTeam(tournament_id, team);
  }

  // @Post("/:id/bracket")
  // async createBracket(
  // 	@Param("id", ParseIntPipe) tournament_id: number,
  // 	@Body() bracket_data: JSON
  // ) {
  // 	return await this.tournamentsService.createBracket(
  // 		tournament_id,
  // 		bracket_data
  // 	);
  // }

  @Put("/:id/bracket")
  async updateBracket(
    @Param("id", ParseIntPipe) tournament_id: number,
    @Body() bracket_data: any
  ) {
    return await this.tournamentsService.updateBracket(
      tournament_id,
      bracket_data
    );
  }
  // @Patch("update/:user_id/:tournament_id")
  // addTournamentOrganizers(
  // 	@Param("user_id") user_id: string,
  // 	@Param("tournament_id", ParseIntPipe) tournament_id: number,
  // 	@Body() organizerEmails: string[]
  // ) {}
}
