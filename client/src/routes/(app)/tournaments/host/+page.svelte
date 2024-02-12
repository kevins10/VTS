<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import axios from 'axios';
    import { access_token } from '$lib/stores/tokenStore';
    import { user_id, user_type } from '$lib/stores/userStore';
    import SideNav from '$lib/components/SideNav.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    export const token = $access_token;
    export const userId = $user_id;

    const formInputStyle = 'mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none';

    let fields = {
        name: '',
        max_teams: 0,
        tournament_format: '',
        description: '',
        start_date: '',
        end_date: '',
        prize_pool: 0,
        // organizers: ,
    }

    let errors = {
        name: '',
        max_teams: '',
        tournament_format: '',
        description: '',
        start_date: '',
        end_date: '',
    }
    let valid = false;
    let errorMsg = '';

    onMount(() => {
        if ($user_type === "USER") {
            goto('/tournaments');
        }
    })

    const tournamentFormatToggle = (event) => {
        fields.tournament_format = event.currentTarget.value;
    }

    const validateForm = () => {
        valid = true;
        if (fields.name.trim().length < 1) {
            valid = false;
            errors.name = 'Tournament Name cannot be empty'
        } else {
            errors.name = '';
        }
        if (fields.max_teams < 1) {
            valid = false;
            errors.max_teams = 'Must be more than 0 teams'
        } else {
            errors.max_teams = '';
        }
        if (fields.tournament_format.trim().length < 1) {
            valid = false;
            errors.tournament_format = 'Must choose a Tournament Format'
        } else {
            errors.tournament_format = '';
        }
        if (fields.description.trim().length < 1) {
            valid = false;
            errors.description = 'Description cannot be empty'
        } else {
            errors.description = '';
        }
        if (fields.start_date.trim().length < 1) {
            valid = false;
            errors.start_date = 'Start date cannot be empty'
        } else {
            errors.start_date = '';
            // convert DateTime to ISO string
            let date = new Date(fields.start_date);
            fields.start_date = date.toISOString();
            console.log(fields.start_date)
        }
        if (fields.end_date.trim().length < 1) {
            valid = false;
            errors.end_date = 'End date cannot be empty'
        } else {
            errors.end_date = '';
            // convert DateTime to ISO string
            let date = new Date(fields.end_date);
            fields.end_date = date.toISOString();
            console.log(fields.end_date)
        }
    }
    
    const submitHandler = async () => {
        validateForm();

        if (valid) {
            await axios.post(`${PUBLIC_API_ADDRESS}/api/tournaments/create/${userId}`, {
                max_teams: fields.max_teams,
                tournament_name: fields.name,
                tournament_format: fields.tournament_format,
                description: fields.description,
                prize_pool: fields.prize_pool,
                start_date: fields.start_date,
                end_date: fields.end_date,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                goto(`/tournaments/${response.data.tournament_id}`);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

</script>


<SideNav page="tournaments">
<body>
    <div class="create-team h-screen overflow-y-auto">
        <div class="form flex items-center h-screen">
            <div class="px-7 py-12 m-auto shadow-lg bg-grey-850 rounded-md">
                <div class="flex justify-center">
                    <h1 class="text-rose-200 font-poppins font-semibold text-4xl cursor-pointer">Host a Tournament</h1>
                </div>
                
                <form on:submit|preventDefault={submitHandler} class="flex flex-col justify-center items-center">

                    <div class="flex justify-center">
                        <div class="mt-9 mx-5">
                            <label for="name" class="text-base text-zinc-300 mb-2">Tournament Name</label><br>
                            <input type="text" id="name" class={formInputStyle} bind:value={fields.name}><br>
                            <div class="error text-red text-sm mt-1">{errors.name}</div>
                        </div>

                        <div class="mt-9 mx-5">
                            <label for="max" class="text-base text-zinc-300 mb-2">Maximum Number of Teams</label><br>
                            <input type="number" id="max" class={formInputStyle} bind:value={fields.max_teams}><br>
                            <div class="error text-red text-sm mt-1">{errors.max_teams}</div>
                        </div>
                    </div>
    
                    <div class="flex justify-center">
                        <div class="mt-9 mx-5">
                            <label for="description" class="text-base text-zinc-300 mb-2">Description</label><br>
                            <textarea id="description" class={formInputStyle} rows="5" bind:value={fields.description}></textarea><br>
                            <div class="error text-red text-sm mt-1">{errors.description}</div>
                        </div>

                        <div>
                            <div class="mt-9 mx-5">
                                <label for="tournament_format" class="text-base text-zinc-300 mb-2">Tournament Format</label><br>
                                <select name="t_format" id="tournament_format" class={formInputStyle} on:change={tournamentFormatToggle}>
                                    <option value="">Round of ...</option>
                                    <option value="RO8">Round of 8</option>
                                    <option value="RO16">Round of 16</option>
                                    <option value="RO32">Round of 32</option>
                                </select><br>
                                <div class="error text-red text-sm mt-1">{errors.tournament_format}</div>
                            </div>
                            <div class="mt-7 mx-5">
                                <label for="prize" class="text-base text-zinc-300 mb-2">Prize Pool $</label><br>
                                <input type="number" min="0" id="prize" class={formInputStyle} bind:value={fields.prize_pool}><br>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <div class="mt-9 mx-5">
                            <label for="start" class="text-base text-zinc-300 mb-2">Start Time</label><br>
                            <input type="datetime-local" id="start" class={`${formInputStyle} cursor-pointer`} bind:value={fields.start_date}><br>
                            <div class="error text-red text-sm mt-1">{errors.start_date}</div>
                        </div>

                        <div class="mt-9 mx-5">
                            <label for="end" class="text-base text-zinc-300 mb-2">End Time</label><br>
                            <input type="datetime-local" id="end" class={`${formInputStyle} cursor-pointer`} bind:value={fields.end_date}><br>
                            <div class="error text-red text-sm mt-1">{errors.end_date}</div>
                        </div>
                    </div>

                    <div class="mt-9 flex flex-row justify-center items-center">
                        <button type="submit" class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300">Create Tournament</button>
                    </div>
                </form>

                {#if errorMsg.length > 0}
                    <div class="mt-10 flex flex-row justify-center items-center">
                        <p class="error text-zinc-300">{errorMsg}</p>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</body>
</SideNav>
