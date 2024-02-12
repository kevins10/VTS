import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class TeamsService {
	constructor(private prisma: PrismaService) {}

	async createTeam(team: Prisma.TeamCreateInput, user_id: string) {
		await this.prisma.team
			.create({
				data: {
					...team,
				},
			})
			.then(async () => {
				await this.prisma.rosters.create({
					data: {
						player: {
							connect: {
								user_id: user_id,
							},
						},
						team: {
							connect: {
								team_name: team.team_name,
							},
						},
					},
				});
			});
	}

	async findAllTeams() {
		return await this.prisma.team.findMany();
	}

	async findTeamByName(team_name: string) {
		return await this.prisma.team.findUnique({
			where: {
				team_name: team_name,
			},
		});
	}

	async findTeamsByUserId(user_id: string) {
		return await this.prisma.team.findMany({
			where: {
				players: {
					some: {
						player_id: user_id,
					},
				},
			},
		});
	}

	async updateTeam(team_name: string, updateTeamInput: Prisma.TeamUpdateInput) {
		return await this.prisma.team.update({
			where: {
				team_name: team_name,
			},
			data: updateTeamInput,
		});
	}

	async deleteTeam(team_name: string) {
		return await this.prisma.team.delete({
			where: {
				team_name: team_name,
			},
		});
	}
}
