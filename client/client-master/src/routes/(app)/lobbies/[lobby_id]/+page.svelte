<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import {page} from '$app/stores'
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { username } from '$lib/stores/userStore'
    import SideNav from '$lib/components/SideNav.svelte';
    const id = $page.params.lobby_id
    var all_players: any[] = []
    var text: string
    var messages: string[] = ['']
    var user:any
    var total_players:any[] = []
    var host = false;
    var host_user = ''
    console.log("this is username", $username)

    async function get_username(){
        user = $username
    }

    async function close_lobby(){
        axios.delete(`${PUBLIC_API_ADDRESS}/api/lobbies/${id}`).then(function(response){window.close()})
    }

    async function get_players() {
        axios.get(`${PUBLIC_API_ADDRESS}/api/lobbies/${id}`)
        .then(function (response){
            console.log("this is response from lobby_id:", response.data[0].players)
            all_players = response.data[0].players
            console.log("ALL PLAYERS: ", all_players)
            all_players.forEach(element => {
                var splitstring = element.split(".")
                console.log("SPLIT", splitstring)
                var data = {
                    username: splitstring[0],
                    riot_name: splitstring[1],
                    riot_tag: splitstring[2]
                }
                total_players.push(data)
                console.log("TOTAL PLAEERS:", total_players)
            });
            total_players = total_players
            host_user = total_players[0].username
            if (host_user == $username){
                host = true
                console.log("I AM HOST")
            }
            console.log("HOST USER: ", host_user)
        })
        .catch(function (error) {
                console.log(error);
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401) {
                        const errorMsg = error.response.data.message;
                }
            }
        });
    }

    onMount(async() => {
        await get_username()
        get_players()
        // join_wsroom()
        
    })

</script>


<SideNav page="lobbies">


<body>


    
    {#each total_players as players}
    <div class="each flex rounded shadow w-max text-gray-600 mb-5 bg-white">
        <div class="sec self-center p-2 w-64">
          <div class="flex">
            <div class="name text-sm">{players.username}</div>
          </div>
          <div class="title text-xs text-gray-400 -mt-1">{players.riot_name}{players.riot_tag}</div>
        </div>
    </div>
    
    {/each}

    {#if host}
        <button on:click={close_lobby}>Start game</button>
    {/if}
</body>

</SideNav>