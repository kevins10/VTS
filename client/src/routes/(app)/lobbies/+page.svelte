<script lang="ts">
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import SideNav from "$lib/components/SideNav.svelte";
    import { username, riot_name, riot_tag } from '$lib/stores/userStore';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { onMount } from 'svelte';
    var test_host = 'testing123';
    var all_lobbies: any[] = [];
    var test_username = 'test_username'
    var username2: string = 'abc'
    var userName = $username
    var rank: any = "Bronze"
    var map: any = "Fracture"
    let showModal = false;
    
    var combined = $username + '.' + $riot_name + '.' + $riot_tag
    console.log("THIS IS COMBINED:", combined)

    function toggleModal(){
        showModal = !showModal;
    }

    async function testlobby(){
        console.log("DATA: ", rank)
        toggleModal()
        
    }

    async function create_lobby() {
        var data = {
            host: userName,
            rank: rank,
            map: map,
            in_progress: false,
            players: [combined],
            
        }

        axios.post(`${PUBLIC_API_ADDRESS}/api/lobbies/create`, data , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                // redirect user to their homepage
                window.open(`/lobbies/${response.data.lobby_id}`, '_blank')?.focus
            })
            .catch(function (error) {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 401) {
                        const errorMsg = error.response.data.message;
                    }
                }
            });
        }

    async function load_lobbies() {
        axios.get(`${PUBLIC_API_ADDRESS}/api/lobbies/all`)
        .then(function (response){
            console.log("this is response from get", response.data)
            all_lobbies = response.data
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

    async function join_lobby(lobby_id: string){
        const resp = await axios.put(`${PUBLIC_API_ADDRESS}/api/lobbies/join`, {lobby_id: lobby_id, username: combined}, {
            headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(function(response) {
            console.log("THIS IS PUT FUNCTION RESPONSE", response.data)
            window.open(`/lobbies/${response.data.lobby_id}`, '_blank')?.focus
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
    onMount(() => {
        
        load_lobbies()
        console.log("THIS IS USERNAME", userName)
    })
</script>


<SideNav page="lobbies">
<body class="bg-grey-1000">

    <button class="bg-rose-200 hover:bg-rose-300 text-white font-bold py-2 px-4 rounded-full mx-5 my-6"  on:click|preventDefault = {toggleModal}>
        CREATE
    </button>
    <div class="grid grid-cols-3 gap-4">
        {#each all_lobbies as lobby }
            <div class = "mx-5 my-3 bg-grey-600 text-white">
                <div>Hosted by: {lobby.host}</div>
                <div>preferred rank: {lobby.rank}</div> 
                <div>preferred map: {lobby.map}</div>  
                {#each lobby.players as players}
                    <div>players: {players}</div> 
                {/each}
                <button class="bg-rose-200 hover:bg-rose-300 text-white font-bold py-2 px-4 rounded-full" on:click|preventDefault = {() => join_lobby(lobby.lobby_id)}>JOIN</button>
            </div>
        {/each}
      </div>
    

      {#if showModal}
      <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
          <!--content-->
          <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
            <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 class="text-3xl font-semibold">
                Create Lobby
              </h3>
              <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" on:click={toggleModal}>
                <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <!--body-->
            <div class="relative p-6 flex-auto">
                <label for="rank">Preferred Rank</label>
                <select bind:value={rank} id="rank" name="rank">
                  <option value="Iron">Iron</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Ascendant+">Ascendant+</option>
                </select>
                <label for="rank">Preferred Map</label>
                <select bind:value={map} id="rank" name="rank">
                  <option value="Split">Split</option>
                  <option value="Haven">Haven</option>
                  <option value="Fracture">Fracture</option>
                  <option value="Icebox">Icebox</option>
                  <option value="Ascent">Ascent</option>
                  <option value="Bind">Bind</option>
                </select>
            </div>
            <!--footer-->
            <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={toggleModal}>
                Close
              </button>
              <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" on:click={create_lobby}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
      {/if}
</body>

</SideNav>




