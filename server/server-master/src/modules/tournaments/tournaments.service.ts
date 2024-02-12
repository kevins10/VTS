import { Injectable } from "@nestjs/common";
import { Prisma, Team } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class TournamentsService {
	constructor(private readonly prisma: PrismaService) {}

	// Return true on success, false on error
	async createTournament(
		createTournamentInput: Prisma.TournamentCreateInput,
		organizer_id: string
	) {
		const organizers = [];

		return await this.prisma.tournament.create({
			data: {
				...createTournamentInput,
				organizers: {
					create: [
						{
							organizer: {
								connect: {
									user_id: organizer_id,
								},
							},
						},
					],
				},
			},
		});
		// 	.then(() => {
		// 		return true;
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 		return false;
		// 	});
		// return false;
	}

	async findAllTournaments() {
		return await this.prisma.tournament.findMany({
			orderBy: [
				{
					tournament_id: "asc",
				},
				{
					createdAt: "asc",
				},
			],
		});
	}

	async findTournamentById(tournament_id: number) {
		return await this.prisma.tournament.findUnique({
			where: {
				tournament_id: tournament_id,
			},
			include: {
				teams: true,
				organizers: true
			},
		});
	}

	async updateTournamentById(
		updateTournamentInput: Prisma.TournamentUpdateInput,
		tournament_id: number
	) {
		return await this.prisma.tournament.update({
			where: {
				tournament_id: tournament_id,
			},
			data: {
				...updateTournamentInput,
			},
		});
	}

	async getTeam(team_name: any) {
		return await this.prisma.team.findUnique({
			where: {
				team_name: team_name,
			},
		});
	}

	async addTeam(tournament_id: any, team: Team) {
		return await this.prisma.tournament.update({
			where: {
				tournament_id: tournament_id,
			},
			data: {
				teams: {
					connect: {
						team_name: team.team_name,
					},
				},
			},
		});
	}

	// async createBracket(tournament_id: number, bracket_data: any) {
	// 	return await this.prisma.bracket.create({
	// 		data: {
	// 			tournament_id: tournament_id,
	// 			data: bracket_data,
	// 		},
	// 	});
	// }

	// async updateTournamentWithBracketID(tournament: number, bracket_id: string) {
	// 	return await this.prisma.tournament.update({
	// 		where: {
	// 			tournament_id: tournament,
	// 		},
	// 		data: {
	// 			bracket_id: bracket_id,
	// 		},
	// 	});
	// }

	async updateBracket(tournament_id: any, bracket_data: any) {
		return await this.prisma.tournament.update({
			where: {
				tournament_id: tournament_id,
			},
			data: {
				bracket_data: bracket_data
			},
		});
	}

	// async addTournamentOrganizers(
	// 	tournament_id: number,
	// 	organizer_emails: string[]
	// ) {
	// 	let tournamentOrganizerInput = [];

	// 	organizer_emails.forEach((email) => {
	// 		tournamentOrganizerInput.push({
	// 			tournament_id: tournament_id,
	// 			organizer_id: email,
	// 		});
	// 	});

	// 	return await this.prisma.tournamentOrganizers.createMany({
	// 		data: tournamentOrganizerInput,
	// 	});
	// }
}
