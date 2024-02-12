<script lang="ts">
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import axios from "axios";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { user_type } from "$lib/stores/userStore";

	import SideNav from "$lib/components/SideNav.svelte";
	import type { Tournament } from "$lib/common/types";
	import { access_token } from "$lib/stores/tokenStore";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import SideScroll from "$lib/components/SideScroll/SideScroll.svelte";
	import type { CardProps } from "$lib/components/Card.svelte";

	export const token = $access_token;
	export const userType = $user_type;

	let tournaments: Tournament[] = [];
	let cardProps: CardProps[] = [];
	let isLoading = true;

	onMount(() => {
		axios
			.get(`${PUBLIC_API_ADDRESS}/api/tournaments/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				res.data.forEach((tournament: Tournament) => {
					tournaments.push(tournament);
					cardProps.push({
						header: tournament.tournament_name,
						body: tournament.description,
						buttonText: "View More",
						buttonUrl: `/tournaments/${tournament.tournament_id}`,
					});
				});
				isLoading = false;
			});
	});
</script>

<SideNav page="tournaments">
	<body>
		{#if userType === "ADMIN"}
			<button
				class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300 mx-5 my-6"
				on:click={() => {
					goto("/tournaments/host");
				}}>Host a Tournament</button
			>
		{/if}

		{#if isLoading === true}
			<LoadingSpinner />
		{:else}
			<div class="grid grid-flow-col">
				<!-- Refactor to grid component -->
				<SideScroll title={"Tournaments"} items={cardProps} {isLoading} />
			</div>
		{/if}
	</body>
</SideNav>
