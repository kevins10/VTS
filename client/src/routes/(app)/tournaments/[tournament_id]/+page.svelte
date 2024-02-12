<script lang="ts">
    import axios from 'axios';
    import { goto } from '$app/navigation';
    import type { LayoutData } from './$types';
    import { access_token } from '$lib/stores/tokenStore';
    import SideNav from "$lib/components/SideNav.svelte";
    import { user_id } from "$lib/stores/userStore";

    export const token = $access_token;
    export let data: LayoutData;
    let tournamentId = data.tournament.tournament_id;
    let tournamentName = data.tournament.tournament_name;
    // console.log(data)
    const organizers = data.tournament.organizers.map(o => o.organizer_id);
    const isOrganizer = organizers.includes($user_id);

    let startDate = new Date(data.tournament.start_date).toLocaleString('en-us', {
        year: 'numeric', 
        month: 'long', 
        day: '2-digit', 
        hourCycle: "h23", 
        hour: '2-digit', 
        minute: '2-digit'
    });
    let endDate = new Date(data.tournament.end_date).toLocaleString('en-us', {
        year: 'numeric', 
        month: 'long', 
        day: '2-digit', 
        hourCycle: "h23", 
        hour: '2-digit', 
        minute: '2-digit'
    });


</script>

<SideNav page="tournaments">
<body>

    <div class="h-screen overflow-y-auto">
        <div class="flex items-center h-screen">
            <div class="w-[600px] px-10 py-12 m-auto shadow-lg bg-grey-850 rounded-md h-[600px]">
                
                <!-- tournament info -->
                <div class="flex justify-center">
                    <h1 class="text-rose-200 font-poppins font-semibold text-4xl text-center">{tournamentName}</h1>
                </div>

                <div class="mt-6 flex flex-row justify-center items-center">
                    {#if !isOrganizer}
                        <!-- only show for non organizers -->
                        <button class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300 mx-5 my-6" 
                            on:click={() => { goto(`/tournaments/${tournamentId}/register`); }}>Register to Play</button>
                    {/if}
                    <button class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300 mx-5 my-6" 
                        on:click={() => { goto(`/tournaments/${tournamentId}/bracket`); }}>Bracket</button>
                </div>
                
                <div class="mt-6 flex flex-row justify-center items-center">
                    <div>
                        <p class="text-white text-lg mb-4">{data.tournament.description}</p>
                        <p class="text-white text-md">Prize Pool: {data.tournament.prize_pool}</p>
                        <p class="text-white text-md">Star Date: {startDate}</p>
                        <p class="text-white text-md">End Date: {endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


</body>
</SideNav>