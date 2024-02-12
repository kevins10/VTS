<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import axios from 'axios';
    import { access_token } from '$lib/stores/tokenStore';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import SideNav from '$lib/components/SideNav.svelte';

    const teamName = $page.params.team_id;
    // console.log(teamName);

    export const token = $access_token;

    const formInputStyle = 'mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none';

    let errors = {
        name: '',
        acronym: ''
    }
    let valid = false;
    let errorMsg = '';

    let team = {
        team_name: '',
        team_acronym: '',
    };

    onMount(async () => {
        await getTeam();
    });

    const getTeam = async () => {
        await axios.get(`${PUBLIC_API_ADDRESS}/api/teams/${teamName}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data);
            team = response.data
        })
        .catch ((error) => {
            console.log(error);
        })
    }

    const validateForm = () => {
        valid = true;
        if (team.team_name.trim().length < 1) {
            valid = false;
            errors.name = 'Team Name cannot be empty'
        } else {
            errors.name = '';
        }
        if (team.team_acronym.trim().length < 1) {
            valid = false;
            errors.acronym = 'Team Acronym cannot be empty'
        } else {
            errors.acronym = '';
        }
    }
    
    const submitHandler = async () => {
        validateForm();

        if (valid) {
            await axios.patch(`${PUBLIC_API_ADDRESS}/api/teams/update/${teamName}`, {
                team_name: team.team_name,
                team_acronym: team.team_acronym,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                window.location.replace(`/teams/${team.team_name}/update`);
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    // request was made, but server responded with a status code that falls out of the 2xx range
                    errorMsg = error.response.data.message;
                }
                else if (error.request) {
                    // request was made, but no response was received
                    console.log(error.request);
                } 
                else {
                    // some other error
                    console.log(error);
                }
            })
        }
    }
</script>


<SideNav page="teams">
<div class="update-team h-screen overflow-y-auto">
    <div class="form form flex items-center h-screen">
        <div class="w-fit px-7 py-12 m-auto shadow-lg bg-grey-850 rounded-md">
            <div class="flex justify-center">
                <h1 class="text-rose-200 font-poppins font-semibold text-4xl cursor-pointer">Update Team Information</h1>
            </div>
            
            <form on:submit|preventDefault={submitHandler}>
                <div class="flex justify-center">
                    <div class="mt-9 mx-5">
                        <label for="name" class="text-base text-zinc-300 mb-2">Team Name</label><br>
                        <input type="text" id="name" class={formInputStyle} bind:value={team.team_name}><br>
                        <div class="error text-red text-sm mt-1">{errors.name}</div>
                    </div>

                    <div class="mt-9 mx-5">
                        <label for="acronym" class="text-base text-zinc-300 mb-2">Team Acronym</label><br>
                        <input type="text" id="acronym" class={formInputStyle} bind:value={team.team_acronym} on:keyup={() => { team.team_acronym = team.team_acronym.toUpperCase(); }}><br>
                        <div class="error text-red text-sm mt-1">{errors.acronym}</div>
                    </div>
                </div>
          
                <div class="mt-6 flex flex-row justify-center items-center">
                    <button type="submit" class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300">Update Team</button>
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
</SideNav>