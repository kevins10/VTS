<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import '$lib/styles/bracketConnector.css';
    import SideNav from "$lib/components/SideNav.svelte";
    import type { PageData } from './$types';
    import axios from 'axios';
    import { access_token } from '$lib/stores/tokenStore';
    import { generateBracket, updateBracket, type Bracket} from "../bracket";
    import { user_id } from "$lib/stores/userStore";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export const token = $access_token;
    export let data: PageData;
    let tournamentId = data.tournament.tournament_id;
    let tournamentFormat = data.tournament.tournament_format;
    let teams = data.tournament.teams
    const organizers = data.tournament.organizers.map(o => o.organizer_id);
    const isOrganizer = organizers.includes($user_id);
    let tournamentBracket = data.tournament.bracket_data;
    let bracket: Bracket;
    // console.log(teams)
    // console.log(tournamentBracket)

    onMount(() => {
        if (!isOrganizer) {
            goto(`/tournaments/${tournamentId}/bracket`);
        }
    })

    if (tournamentBracket === null) {
        console.log(teams)
        bracket = generateBracket(tournamentFormat, teams);
    } else {
        bracket = tournamentBracket.bracket;
    }

    let winner: string|null = "";

    const handleUpdateBracket = async (b: Bracket) => {
        bracket = updateBracket(b);
        console.log(bracket);

        await axios.put(`${PUBLIC_API_ADDRESS}/api/tournaments/${tournamentId}/bracket`, {
            bracket,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

        // update winner
        winner = bracket.rounds[bracket.rounds.length - 1].matches[0].winner;
        console.log(winner)
    }
</script>

<SideNav page="tournaments">
<body>
    <div class="mt-10">
        {#if winner} 
            <h1 class="text-rose-200 font-poppins font-semibold text-2xl text-center">Champion: {winner}</h1>
        {/if}
    </div>
    <div class="flex mr-3 mt-16">
        {#each bracket.rounds as round, i}
            <ol class={`flex flex-1 flex-col justify-around m-5 round ${ i === bracket.rounds.length-1 ? "round-winner" : "" }`}>
                {#each round.matches as match, j}
                <li id="round-{i+1}" class="items-center m-2 p-1 pl-2 min-w-[125px] max-w[125px] leading-relaxed bg-white text-gray-300 font-poppins text-sm rounded-sm relative with-connector">
                    <div class="flex flex-row justify-center items-center">
                        <span class="basis-11/12">{match.team1}</span>
                        <input type="number" min="1" max="25" class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none" on:focus={(event) => event.target.select()} bind:value={match.team1_score}>
                    </div>
                    <hr class="text-grey-400">
                    <div class="flex flex-row justify-center items-center">
                        <p class="basis-11/12">{match.team2}</p>
                        <input type="number" min="0" max="25" class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none" on:focus={(event) => event.target.select()} bind:value={match.team2_score}>
                    </div>
                </li>
                {/each}
            </ol>
        {/each}
    </div>
    <button class="bg-rose-200 h-10 py-2 px-12 text-white rounded-full transition hover:bg-rose-300 mx-5 my-6"  on:click={() => handleUpdateBracket(bracket)}>Update changes</button>

</body>
</SideNav>