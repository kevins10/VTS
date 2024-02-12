<script lang="ts">
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import logo from "$lib/images/logo.png";
	import { goto } from "$app/navigation";
	import { createSearchStore, searchHandler } from "$lib/stores/searchStore";
	import { onDestroy, onMount } from "svelte";
	import axios from "axios";
	import { access_token } from "$lib/stores/tokenStore";
	import { user_id } from "$lib/stores/userStore";

	import type { Team } from "$lib/common/types";

	let teams: Team[] = [];

	let profilePicture = "";
	let isProfilePictureLoaded = false;

	const getTeams = async () => {
		await axios
			.get(`${PUBLIC_API_ADDRESS}/api/teams/player/${$user_id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${$access_token}`,
				},
			})
			.then(function (response) {
				response.data.forEach((team: Team) => teams.push(team));
			})
			.catch(function (error) {
				if (error.response) {
					// request was made, but server responded with a status code that falls out of the 2xx range
					const { status } = error.response;
					if (status === 401) {
						// client must authenticate itself to get the requested response
						goto("/login");
					}
				} else if (error.request) {
					// request was made, but no response was received
					console.log(error.request);
				} else {
					// some other error
					console.log(error);
				}
			});
	};

	onMount(() => {
		getTeams();
	});

	onMount(() => {
		axios
			.get(`${PUBLIC_API_ADDRESS}/api/users/profile_picture/${$user_id}`, {
				headers: {
					Authorization: `Bearer ${$access_token}`,
				},
			})
			.then((res) => {
				if (res.data.profilePicture != "" || res.data.profilePicture != null) {
					profilePicture = `data:image/png;base64,${res.data.profilePicture}`;
				}
				isProfilePictureLoaded = true;
			})
			.catch((e) => {
				console.log(e);
			});
	});

	const teamsClicked = async () => {
		showTeams = !showTeams;
	};

	// console.log(teams);
	// // filter by search for teams
	// const searchTeams: Team[] = teams.map((team: Team) => ({
	// 	...team,
	// 	searchTerms: `${team.team_name}`,
	// }));
	// const searchStore = createSearchStore(searchTeams);
	// const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	// onDestroy(() => {
	// 	unsubscribe();
	// });

	// console.log($searchStore.filtered)

	// styling
	let sideBarIconStyle =
		"group relative flex items-center justify-center h-14 w-14 mt-2 mb-2 mx-auto bg-grey-800 hover:bg-rose-200 rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer";
	let sideBarIconStyleClicked =
		"group relative flex items-center justify-center h-14 w-14 mt-2 mb-2 mx-auto bg-rose-200 rounded-xl transition-all duration-300 ease-linear cursor-pointer";
	let sideBarTooltipStyle =
		"group-hover:scale-100 absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-black text-s transition-all duration-200 scale-0 origin-left";

	let onHome = false;
	let onTeams = false;
	let onTournaments = false;
	let onLobbies = false;
	let showTeams = false;
	let onProfile = false;

	export let page: string = "";
	if (page === "home") {
		onHome = true;
	} else if (page === "teams") {
		onTeams = true;
	} else if (page === "tournaments") {
		onTournaments = true;
	} else if (page === "lobbies") {
		onLobbies = true;
	} else if (page === "profile") {
		onProfile = true;
	}

	const logout = () => {
		localStorage.setItem("access_token", "");
		localStorage.setItem("user_id", "");
		localStorage.setItem("first_name", "");
		localStorage.setItem("last_name", "");
		localStorage.setItem("username", "");
		localStorage.setItem("riot_name", "");
		localStorage.setItem("riot_tag", "");
		goto("/login");
	};

	const getTeamDetails = (team_name: string) => {
		console.log(team_name);
		window.location.replace(`/teams/${team_name}`);
	};
</script>

<!-- make pages responsive to slider -->
<div class={`bracket ${showTeams ? "ml-[225px]" : "ml-0"} duration-300`}>
	<slot />
</div>

<div class="flex m-0">
	<section
		class={`bg-grey-850 fixed top-0 left-0 h-screen m-0 ml-[100px] p-0 pt-6 ${
			showTeams ? "w-[225px]" : "w-0"
		} duration-300`}
	>
		<!-- <input
			type="search"
			placeholder="Search..."
			class={`fixed m-2 py-2 rounded-lg ${
				showTeams ? "w-[210px] px-2" : "w-0 p-0"
			} duration-300`}
		/> -->
		<div class="mt-5">
			<h2 class={`${showTeams ? "opacity-100 text-white font-poppins text-center text-lg" : "opacity-0"} duration-300`}>
				My Teams</h2>
		</div>

		<div class="all-teams mt-12 max-h-screen overflow-y-auto">
			{#each teams as team}
				<div
					class={`bg-grey-400 m-2 py-1 rounded-sm ${
						showTeams ? "w-[210px]" : "w-0"
					} duration-300`}
				>
					<button
						class="w-full"
						on:click={() => {
							getTeamDetails(team.team_name);
							showTeams = !showTeams;
						}}
					>
						<h2
							class={`${showTeams ? "opacity-100" : "opacity-0"} duration-300`}
						>
							{team.team_name}
						</h2>
					</button>
				</div>
			{/each}
		</div>

		<!-- <input type="search" placeholder="Search..." class={`fixed m-2 py-2 rounded-lg ${showTeams ? "w-[210px] px-2" : "w-0 p-0"} duration-300`} bind:value={$searchStore.search} />

		<div class="all-teams mt-12 max-h-screen overflow-y-auto">
			{#each $searchStore.filtered as team}
					<div class={`bg-grey-400 m-2 py-1 rounded-sm ${showTeams ? "w-[210px]" : "w-0"} duration-300`}>
							<button class="w-full" on:click={() => { getTeamDetails(team.team_name) }}>
									<h2 class={`${showTeams ? "opacity-100" : "opacity-0"} duration-300`}>{team.team_name}</h2>
									<p class={`${showTeams ? "opacity-100" : "opacity-0"} duration-300`}>{team.team_acronym}</p>
							</button>
					</div>
			{/each}
		</div> -->

		<input
			type="submit"
			class={`fixed bottom-0 mx-2 py-2 bg-rose-200 text-white rounded-sm cursor-pointer ${
				showTeams ? "w-[210px]" : "w-0"
			} duration-300`}
			value="+ Add New Team"
			on:click={() => {
				goto(`/teams/create`);
			}}
		/>
		<input
			type="submit"
			class={`fixed bottom-14 mx-2 py-2 bg-rose-200 text-white rounded-sm cursor-pointer ${
				showTeams ? "w-[210px]" : "w-0"
			} duration-300`}
			value="View All"
			on:click={() => {
				goto("/teams");
			}}
		/>
	</section>
</div>

<div class="flex">
	<div
		class="fixed top-0 left-0 h-screen w-[100px] m-0 flex flex-col bg-grey-900 text-white shadow-lg"
	>
		<div class="text-zinc-300 text-x1">
			<div class="p-2.5 mt-1 flex items-center cursor-pointer">
				<img alt="The app logo" src={logo} class="h-20 w-20" />
			</div>
		</div>
		<hr
			class="w-16 mx-4 h-0.5 mb-4 bg-grey-800 border-0 rounded flex items-center"
		/>

		<button
			class={`${onHome ? sideBarIconStyleClicked : sideBarIconStyle}`}
			on:click={() => {
				goto("/");
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="34px"
				viewBox="0 0 24 24"
				width="34px"
				fill={`${onHome ? "#FFFFFF" : "#CCCCCC"}`}
				class="hover:fill-white"
				><path d="M0 0h24v24H0z" fill="none" /><path
					d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
				/></svg
			>
			<span class={sideBarTooltipStyle}>Home</span>
		</button>
		<!-- <button class={`${onTeams ? sideBarIconStyleClicked : sideBarIconStyle}`} on:click={() => { showTeams = !showTeams; }}> -->
		<button
			class={`${onTeams ? sideBarIconStyleClicked : sideBarIconStyle}`}
			on:click={teamsClicked}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				enable-background="new 0 0 24 24"
				height="34px"
				viewBox="0 0 24 24"
				width="34px"
				fill={`${onTeams ? "#FFFFFF" : "#CCCCCC"}`}
				class="hover:fill-white"
				><rect fill="none" height="34" width="34" /><g
					><path
						d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"
					/></g
				></svg
			>
			<span class={sideBarTooltipStyle}>Teams</span>
		</button>
		<button
			class={`${onTournaments ? sideBarIconStyleClicked : sideBarIconStyle}`}
			on:click={() => {
				goto("/tournaments");
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				enable-background="new 0 0 24 24"
				height="34px"
				viewBox="0 0 24 24"
				width="34px"
				fill={`${onTournaments ? "#FFFFFF" : "#CCCCCC"}`}
				class="hover:fill-white"
				><rect fill="none" height="34" width="34" /><path
					d="M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M19,8 c0,1.3-0.84,2.4-2,2.82V7h2V8z"
				/></svg
			>
			<span class={sideBarTooltipStyle}>Tournaments</span>
		</button>
		<button
			class={`${onLobbies ? sideBarIconStyleClicked : sideBarIconStyle}`}
			on:click={() => {
				goto("/lobbies");
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				enable-background="new 0 0 24 24"
				height="34px"
				viewBox="0 0 24 24"
				width="34px"
				fill={`${onLobbies ? "#FFFFFF" : "#CCCCCC"}`}
				class="hover:fill-white"
				><g><rect fill="none" height="34" width="34" /></g><g
					><g
						><path
							d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"
						/></g
					></g
				></svg
			>
			<span class={sideBarTooltipStyle}>Lobbies</span>
		</button>
		<div class="flex flex-col absolute inset-x-0 bottom-0 m-4">
			<button
				class={`${onProfile ? sideBarIconStyleClicked : sideBarIconStyle}`}
				on:click={() => {
					goto(`/profile/edit/${$user_id}`);
				}}
			>
				{#if isProfilePictureLoaded}
					<img src={profilePicture} alt="profile picture" />
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						height="34px"
						viewBox="0 0 24 24"
						width="34px"
						fill={`${onLobbies ? "#FFFFFF" : "#CCCCCC"}`}
						class="hover:fill-white"
						><g><rect fill="none" height="24" width="24" /></g><g
							><path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"
							/></g
						></svg
					>
				{/if}
				<span class={sideBarTooltipStyle}>Profile</span>
			</button>
			<button class={sideBarIconStyle} on:click|preventDefault={logout}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="#CCCCCC"
					class="hover:fill-white"
					><path d="M0 0h24v24H0z" fill="none" /><path
						d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
					/></svg
				>
				<span class={sideBarTooltipStyle}>Logout</span>
			</button>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.all-teams::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.all-teams {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
