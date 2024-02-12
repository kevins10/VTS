import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class RostersService {
	constructor(private readonly prisma: PrismaService) {}

	async getTeamRoster(team_name: string) {
		return await this.prisma.rosters.findMany({
			where: {
				team_name: team_name,
			},
			select: {
				join_date: true,
				player: {
					select: {
						username: true,
						first_name: true,
						last_name: true,
						discord: true,
						riot_name: true,
						riot_tag: true,
						profilePicture: true,
					},
				},
			},
		});
		//   .then((rosters) => {
		//     let players = []; //TODO(): Add type ref
		//     rosters.forEach((roster) => {
		//       players.push(roster.player);
		//     });

		//     return players;
		//   })
		//   .catch(() => null);
	}

	async addPlayerToTeam(user_id: string, team_name: string) {
		return await this.prisma.rosters.create({
			data: {
				player: {
					connect: {
						user_id: user_id,
					},
				},
				team: {
					connect: {
						team_name: team_name,
					},
				},
			},
		});
	}
}
