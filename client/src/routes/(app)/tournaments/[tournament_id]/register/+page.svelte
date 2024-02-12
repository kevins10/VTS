<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { access_token } from '$lib/stores/tokenStore';
    import SideNav from "$lib/components/SideNav.svelte";
    import type { Team } from "$lib/common/types";
    import { createSearchStore, searchHandler } from "$lib/stores/searchStore";
	import { onDestroy, onMount } from "svelte";
    import { user_id } from "$lib/stores/userStore";

    const formInputStyle = 'mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none';

    export const token = $access_token;
    export let data: PageData;
    let tournamentId = data.tournament.tournament_id;
    // console.log(data)
    const organizers = data.tournament.organizers.map(o => o.organizer_id);
    const isOrganizer = organizers.includes($user_id);
    let registerTeamName = '';
    let error = '';


	let teams: Team[] = [];

	// const getTeams = async () => {
	// 	await axios
	// 		.get(`${PUBLIC_API_ADDRESS}/api/teams/player/${$user_id}`, {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${$access_token}`,
	// 			},
	// 		})
	// 		.then(function (response) {
    //             teams = response.data;
	// 		})
	// 		.catch(function (error) {
    //             console.log(error);
	// 		});
	// };

	// onMount(async () => {
	// 	await getTeams();
	// 	console.log(teams);
	// });

    onMount(() => {
        if (isOrganizer) {
            goto(`/tournaments/${tournamentId}`);
        }
    })

    
    const joinTournament = async () => {
        if (registerTeamName.trim().length < 1) {
            error = 'Please select a Team to register with'
        } else {
            await axios.put(`${PUBLIC_API_ADDRESS}/api/tournaments/join/${tournamentId}`, {
                team_name: registerTeamName,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                window.location.replace(`/tournaments/${tournamentId}`);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

	// filter by search for teams
	const searchTeams: Team[] = data.team.map((team: Team) => ({
		...team,
		searchTerms: `${team.team_name}`,
	}));
	const searchStore = createSearchStore(searchTeams);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	onDestroy(() => {
		unsubscribe();
	});

  
</script>

<SideNav page="tournaments">
<body>

    <div class="h-screen overflow-y-auto">
        <div class="flex items-center h-screen">
            <div class="w-fit px-10 py-12 m-auto shadow-lg bg-grey-850 rounded-md">
                <div class="flex justify-center">
                    <h1 class="text-rose-200 font-poppins font-semibold text-4xl text-center">Register with an Existing Team</h1>
                </div>

                <div class="text-center h-10 m-8">
                    <p class="text-white text-xl font-poppins">{registerTeamName}</p>
                </div>
                
                <input type="search" placeholder="Search..." class={`p-2 rounded-lg w-full`} bind:value={$searchStore.search} />

                <div class="mt-4 max-h-screen overflow-y-auto">
                    {#each $searchStore.filtered as team}
                        <div>
                            <button class="bg-grey-400 py-1 rounded-sm w-full hover:bg-grey-300 transition duration-150" on:click={() => { registerTeamName = team.team_name }}>
                                    <h2 class='text-black'>{team.team_name}</h2>
                                    <p class="text-black">{team.team_acronym}</p>
                            </button>
                        </div>
                    {/each}
                </div>

                <div class="mt-6 flex flex-row justify-center items-center">
                    <button class="bg-rose-200 py-2 px-12 text-white rounded-full transition duration-150 hover:bg-rose-300 mx-5 mt-6" 
                    on:click={joinTournament}>Register</button>
                </div>

                <div class="mt-6 flex flex-row justify-center items-center error text-red text-sm">{error}</div>

            </div>
        </div>
    </div>
  

</body>
</SideNav>