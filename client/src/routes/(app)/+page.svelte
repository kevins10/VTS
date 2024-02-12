<script lang="ts">
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import { access_token } from "$lib/stores/tokenStore";
	import { user_id, username } from "$lib/stores/userStore";
	import type { Team, Tournament } from "$lib/common/types";

	import { onMount } from "svelte";
	import axios from "axios";
	import SideNav from "$lib/components/SideNav.svelte";
	import SideScroll from "$lib/components/SideScroll/SideScroll.svelte";
	import type { CardProps } from "$lib/components/Card.svelte";
	import logo from "$lib/images/logo.png";

	export const token = $access_token;
	export const userId = $user_id;
	export const userName = $username;

	let tournaments: Tournament[] = [];
	let tournamentCardProps: CardProps[] = [];
	let isTournamentsLoading = true;

	let teams = [];
	let teamCardProps: CardProps[] = [];
	let isTeamsLoading = true;

	// Fetch tournaments
	onMount(() => {
		axios
			.get(`${PUBLIC_API_ADDRESS}/api/tournaments/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);

				res.data.forEach((tournament: Tournament) => {
					let startDate = new Date(tournament.start_date).toLocaleString("en", {
						month: "long",
						day: "numeric",
						year: "numeric",
					});
					let endDate = new Date(tournament.end_date).toLocaleString("en", {
						month: "long",
						day: "numeric",
						year: "numeric",
					});

					tournaments.push(tournament);
					tournamentCardProps.push({
						header: tournament.tournament_name,
						body: `${startDate} to ${endDate}`,
						buttonText: "Learn More",
						buttonUrl: `/tournaments/${tournament.tournament_id}`,
					});
				});

				isTournamentsLoading = false;
			})
			.catch((e) => console.log(e));
	});

	// Fetch teams
	onMount(() => {
		axios
			.get(`${PUBLIC_API_ADDRESS}/api/teams/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				res.data.forEach((team: Team) => {
					teams.push(team);
					teamCardProps.push({
						header: team.team_acronym,
						body: team.team_name,
						buttonText: "Learn more",
						buttonUrl: `teams/${team.team_name}`,
					});
				});

				isTeamsLoading = false;
			});
	});
</script>

<SideNav page="home">
	<body>
		<div class="container my-24 mx-auto">
			<section
				class="mb-32 text-gray-800 text-center lg:text-left background-radial-gradient"
			>
				<div
					class="relative overflow-hidden bg-no-repeat bg-cover"
					style="
					background-position: 50%;
					background-image: url('https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltc04e4637524166dc/621853fd6be1e66143a66db2/022822_TakeoverCap_Banner.jpg?auto=webp&disable=upscale&height=549');
					height: 500px;
				  "
				>
					<div
						class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
						style="background-color: rgba(0, 0, 0, 0.75)"
					>
						<div class="flex justify-center items-center h-full">
							<div
								class="text-center text-white px-6 py-6 md:py-0 md:px-12 max-w-[800px]"
							>
								<h2
									class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-12 text-cordovan-300"
								>
									{userName}
								</h2>
								<div class="flex">
									<p class="text-lg my-auto">Welcome back to</p>
									<img alt="The app logo" src={logo} class="h-28 w-28" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>

		<SideScroll
			title={"Upcoming Tournaments!"}
			items={tournamentCardProps}
			isLoading={isTournamentsLoading}
		/>
		<SideScroll
			title={"Join a team!"}
			items={teamCardProps}
			isLoading={isTeamsLoading}
		/>
	</body>
</SideNav>
