<script lang="ts">
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import SideNav from "$lib/components/SideNav.svelte";

	import type { Team } from "$lib/common/types";
	import { access_token } from "$lib/stores/tokenStore";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import type { CardProps } from "/components/Card.svelte";
	import { onMount } from "svelte";
	import axios from "axios";
	import SideScroll from "$lib/components/SideScroll/SideScroll.svelte";

	export const token = $access_token;

	let teams: Team[] = [];
	let cardProps: CardProps[] = [];
	let isLoading = true;

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
					cardProps.push({
						header: team.team_acronym,
						body: team.team_name,
						buttonText: "Learn more",
						buttonUrl: `teams/${team.team_name}`,
					});
				});
				isLoading = false;
			});
	});
</script>

<SideNav page="teams">
	<body>
		<!-- Refactor to grid component -->
		<SideScroll title={"All teams"} items={cardProps} {isLoading} />
	</body>
</SideNav>
