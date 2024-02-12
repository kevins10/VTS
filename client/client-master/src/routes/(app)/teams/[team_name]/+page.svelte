<script lang="ts">
	import axios from "axios";
	import { goto } from "$app/navigation";
	import type { PageData } from "../$types";
	import { access_token } from "$lib/stores/tokenStore";
	import SideNav from "$lib/components/SideNav.svelte";
	import { onMount } from "svelte";
	import type { Player } from "$lib/common/types";
	import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
	import PlayerModal from "$lib/components/PlayerModal.svelte";
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import { user_id } from "$lib/stores/userStore";
	import PlayerAvatarSvg from "$lib/images/PlayerAvatarSVG.svelte";

	export const token = $access_token;
	export const userId = $user_id;

	export let data: PageData;

	let roster: Player[] = [];
	let isLoading = true;

	let playerModalId = "";
	let errorMsg = "";

	// Fetch roster
	onMount(async () => {
		await axios
			.get(`${PUBLIC_API_ADDRESS}/api/rosters/${data.team_name}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				res.data.forEach((player: Player) => {
					player.join_date = new Date(player.join_date).toLocaleString("en", {
						month: "long",
						day: "numeric",
						year: "numeric",
					});
					roster.push(player);
				});

				isLoading = false;
			});
	});

	const handleDelete = async () => {
		await axios
			.delete(`${PUBLIC_API_ADDRESS}/api/teams/${data.team_name}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				window.location.replace(`/teams`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const joinTeam = async () => {
		if (roster.length === 5) {
			errorMsg = "*Cannot be added to team. This team is already full*"
		} else {
			try {
			const res = await axios.post(
				`${PUBLIC_API_ADDRESS}/api/teams/join/${userId}/${data.team_name}`
			);
				console.log(res);
			} catch {}
		}
	};
</script>

<SideNav page="teams">
	<!-- Container for demo purpose -->
	<div class="container my-24 px-6 mx-auto text-white">
		{#if isLoading === true}
			<LoadingSpinner />
		{:else}
			<!-- Section: Design Block -->
			<section class="mb-32 text-gray-800">
				<div class="flex flex-wrap items-center">
					<div
						class="grow-0 shrink-0 basis-auto w-full lg:w-5/12 mb-12 lg:mb-0 md:px-6"
					>
						<div>
							<p class="text-red text-sm m-2 text-center">{errorMsg}</p>
						</div>
						<div
							class="relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
							data-mdb-ripple="true"
							data-mdb-ripple-color="light"
							style="background-position: 50%"
						>
							<img
								src="https://mdbootstrap.com/img/new/textures/full/126.jpg"
								class="w-full"
							/>
							<a href="#!">
								<div
									class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
									style="background-color: rgba(0, 0, 0, 0.4)"
								>
									<div class="flex justify-center items-center h-full">
										<div class="px-6 py-12 md:px-12 text-white text-center">
											<h3 class="text-2xl uppercase font-bold mb-6">
												{data.team_name} -
												<u style="color: hsl(231, 52.6%, 85%)"
													>{data.team_acronym}</u
												>
											</h3>
											<p style="color: hsl(231, 52.6%, 85%)">
												Insert team description here
											</p>
											<button
												type="button"
												class="inline-block rounded bg-rose-200 mt-4 text-center px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
												data-te-ripple-init
												data-te-ripple-color="light"
												on:click={joinTeam}
											>
												Join
											</button>
										</div>
									</div>
								</div>
								<div class="relative overflow-hidden bg-no-repeat bg-cover">
									<div
										class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
										style="background-color: rgba(251, 251, 251, 0.2)"
									/>
								</div>
							</a>
						</div>
					</div>

					<div class="grow-0 shrink-0 basis-auto w-full lg:w-7/12 md:px-6">
						<p class="m-8 text-5xl font-semibold">Active Roster</p>
						{#each roster as player}
							<div class="flex mb-12">
								<div class="shrink-0">
									{#if player.player.profilePicture === null}
										<PlayerAvatarSvg />
									{:else}
										<img
											src={`data:image/png;base64,${player.player.profilePicture}`}
											alt="profile picture"
										/>
									{/if}
								</div>
								<div class="grow ml-4">
									<p class="font-extrabold text-xl mb-1">
										{player.player.username}
									</p>
									<p class="text-gray-500">
										{player.player.first_name}
										{player.player.last_name}
									</p>
									<p>Date joined: {player.join_date}</p>
								</div>
								<PlayerModal playerModalProps={player} />
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}
		<!-- Section: Design Block -->
	</div>
	<!-- Container for demo purpose -->
</SideNav>
