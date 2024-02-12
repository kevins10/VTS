import { Prisma, PrismaClient, User } from "@prisma/client";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

type orgId = {
	organizer_id: string;
};

const seedUsers = async () => {
	let userArray: Prisma.UserCreateInput[] = [];
	for (let i = 0; i < 100; i++) {
		let user: Prisma.UserCreateInput = {
			username: `user#${i + 1}`,
			email: `user_${i + 1}@gmail.com`,
			password: "thisisaterriblepassword1234",
			phone_number: `604-121-${i}`,

			date_of_birth: new Date(50000000000000),
			first_name: `${i}`,
			last_name: `${-i}`,

			riot_name: "machograndma",
			riot_tag: "#NA1",

			user_type: "USER",
		};

		userArray.push(user);
	}

	// Set User 0 to admin
	userArray[0].user_type = "ADMIN";

	userArray.map(async (user: User) => {
		const encryptedPassword = await bcrypt.genSalt(11).then((salt) => {
			return bcrypt.hash(user.password, salt);
		});

		user.password = encryptedPassword;

		await prisma.user.create({
			data: user,
		});
	});
};

const seedTeams = async () => {
	const players: User[] = await prisma.user.findMany();

	await prisma.team.create({
		data: {
			team_name: "The Guard",
			team_acronym: "TGRD",
			players: {
				create: [
					{
						player: {
							connect: {
								email: "user_1@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_2@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_3@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_4@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_5@gmail.com",
							},
						},
					},
				],
			},
		},
	});

	await prisma.team.create({
		data: {
			team_name: "Sentinels",
			team_acronym: "SEN",
			players: {
				create: [
					{
						player: {
							connect: {
								email: "user_6@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_7@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_8@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_9@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_10@gmail.com",
							},
						},
					},
				],
			},
		},
	});

	await prisma.team.create({
		data: {
			team_name: "LOUD",
			team_acronym: "LL",
			players: {
				create: [
					{
						player: {
							connect: {
								email: "user_11@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_12@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_13@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_14@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_15@gmail.com",
							},
						},
					},
				],
			},
		},
	});

	await prisma.team.create({
		data: {
			team_name: "NRG Esports",
			team_acronym: "NRG",
			players: {
				create: [
					{
						player: {
							connect: {
								email: "user_11@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_12@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_13@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_14@gmail.com",
							},
						},
					},
					{
						player: {
							connect: {
								email: "user_15@gmail.com",
							},
						},
					},
				],
			},
		},
	});
};

// Uesrs 90-99 are organizers
const seedTournaments = async () => {
	let user_ids: orgId[] = [];

	await prisma.user
		.findMany({
			where: {
				email: {
					in: [
						"user_90@gmail.com",
						"user_91@gmail.com",
						"user_92@gmail.com",
						"user_93@gmail.com",
						"user_94@gmail.com",
						"user_95@gmail.com",
						"user_96@gmail.com",
						"user_97@gmail.com",
						"user_98@gmail.com",
						"user_99@gmail.com",
					],
				},
			},
			select: {
				user_id: true,
			},
		})
		.then((organizerIds) => {
			organizerIds.forEach((organizerId) => {
				user_ids.push({
					organizer_id: organizerId.user_id,
				});
			});
		})
		.then(async () => {
			await prisma.tournament.create({
				data: {
					tournament_format: "RO8",
					max_teams: 12,
					description: "CMPT 372 end of semester valorant tournament :3",
					start_date: new Date(2023, 3, 29),
					end_date: new Date(2023, 4, 12),
					tournament_name: "CMPT 372 class tournament",
					prize_pool: 2000.5,
					organizers: {
						createMany: {
							data: [...user_ids],
						},
					},
				},
			});

			await prisma.tournament.create({
				data: {
					tournament_format: "RO32",
					max_teams: 36,
					description: "SFU's annual LAN party",
					start_date: new Date(2023, 4, 29),
					end_date: new Date(2023, 5, 12),
					tournament_name: "SFU LAN party 2023!",
					prize_pool: 10000,
					organizers: {
						createMany: {
							data: [...user_ids],
						},
					},
				},
			});
		});
};

async function main() {
	// seedUsers();
	// seedTeams();
	seedTournaments();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
