<script lang="ts">
    import '$lib/styles/bracketConnector.css';
    import SideNav from "$lib/components/SideNav.svelte";
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import { access_token } from '$lib/stores/tokenStore';
    import { generateEmptyBracket, type Bracket} from "./bracket";
    import { user_id } from "$lib/stores/userStore";

    export const token = $access_token;
    export let data: PageData;
    let tournamentId = data.tournament.tournament_id;
    let tournamentFormat = data.tournament.tournament_format;
    let tournamentBracket = data.tournament.bracket_data;
    let teams = data.tournament.teams;
    const organizers = data.tournament.organizers.map(o => o.organizer_id);
    const isOrganizer = organizers.includes($user_id);

    let bracket: Bracket;
    let winner: string|null = "";

    console.log(data)
    if (tournamentBracket === null) {
        bracket = generateEmptyBracket(tournamentFormat);
    } else {
        bracket = tournamentBracket.bracket;
        winner = bracket.rounds[bracket.rounds.length - 1].matches[0].winner;
    }

</script>

<SideNav page="tournaments">
<body class="h-screen overflow-y-auto">
    <div class="grid grid-cols-4 gap-4 h-screen">
        <div class="p-8 bg-grey-700">
            <h1 class="text-rose-200 font-poppins font-semibold text-xl mb-6">Registered Teams</h1>
            {#each teams as team}
                <span class="text-white">{team.team_name}</span>
                <hr class="h-px my-4 bg-grey-600 border-0">
            {/each}
        </div>

        <div>
            <div class="mt-10">
                {#if winner} 
                    <h1 class="text-rose-200 font-poppins font-semibold text-2xl text-center">Champion: {winner}</h1>
                {/if}
            </div>
            <div class="flex mr-3 mt-16 col-span-3">
                {#each bracket.rounds as round, i}
                    <ol class={`flex flex-1 flex-col justify-around m-5 round ${ i === bracket.rounds.length-1 ? "round-winner" : "" }`}>
                        {#each round.matches as match, j}
                        <li id="round-{i+1}" class="items-center m-2 p-1 pl-2 min-w-[125px] max-w[125px] leading-relaxed bg-white text-gray-300 font-poppins text-sm rounded-sm relative with-connector">
                            <div class="flex flex-row justify-center items-center">
                                <span class="basis-11/12">{match.team1}</span>
                                {#if tournamentBracket === null}
                                    <span class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none">-</span>
                                {:else}
                                    <input type="number" min="1" max="25" class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none" bind:value={match.team1_score} disabled>
                                {/if}
                            </div>
                            <hr class="text-grey-400">
                            <div class="flex flex-row justify-center items-center">
                                <span class="basis-11/12">{match.team2}</span>
                                {#if tournamentBracket === null}
                                    <span class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none">-</span>
                                {:else}
                                    <input type="number" min="1" max="25" class="basis-1/12 w-14 m-1 bg-white text-right focus:outline-none" bind:value={match.team2_score} disabled>
                                {/if}
                            </div>
                        </li>
                        {/each}
                    </ol>
                {/each}
            </div>

            {#if isOrganizer}
                <!-- only if user id an organizer -->
                <button class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300 mx-5 my-6" 
                    on:click={() => { goto(`/tournaments/${tournamentId}/bracket/update`); }}>Update</button>
            {/if}
        </div>
    </div>
    
</body>
</SideNav>

<style>
    /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>
