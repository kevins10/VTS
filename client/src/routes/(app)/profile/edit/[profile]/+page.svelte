<script lang="ts">
    import {page} from '$app/stores'
    import { PUBLIC_API_ADDRESS } from '$env/static/public';
    import SideNav from '$lib/components/SideNav.svelte';
    import { username, user_id, first_name, last_name, riot_name, riot_tag } from '$lib/stores/userStore'
    import axios from 'axios';
    import {onMount} from 'svelte'
    const id = $page.params.profile
    var obj: any
    var userid = 'whack'
    var dis = true
    var discord: any
    var userName = 'test'
    var firstName = ''
    var lastName = ''

    
    async function getUser(){

       
        await axios.get(`${PUBLIC_API_ADDRESS}/api/users/get/id/${id}`, {

            })
            .then(function (response) {
                console.log("response: ", response.data)
                obj = response.data
                userid = response.data.user_id
                userName = response.data.username
                firstName = response.data.first_name
                lastName = response.data.last_name
                if(response.data.discord === null){
                    dis = false
                }
                discord = response.data.discord
            })
            .catch(function (error) {
                console.log(error)
            });

        
        
    }

    async function update(){

        var data = {
            first_name: firstName,
            last_name: lastName,
            username: userName
        }
        await axios.patch(`${PUBLIC_API_ADDRESS}/api/users/update/id/${id}`, data).then(function (response){
            console.log("this is response from get", response.data)
        })
        getUser()

    }

    onMount(() => {
        getUser()
    })
</script>

<SideNav page="profile">

    <body style="color: antiquewhite;">
        <br>
        <div class = "flex justify-center items-center bg-grey-1000">
            <div class = "grid gap-20 grid-cols-2 max-w-lg bg-grey-850 rounded-md">
                <div>
                    <div style = "margin-left: 20px; margin-top: 30px;">Username:</div>
                    <input  style = "margin-left: 20px;margin-top: 10px;color:black;" type="text" bind:value={userName}/>
                </div>
                <div>
                    <div style = "margin-top: 30px;">Riot ID:</div>
                    <div style = "margin-top: 10px;">{$riot_name}{$riot_tag}</div>
                </div>
                <div>
                    <div style = "margin-left: 20px; color:black;">First Name:</div>
                    <input  style = "margin-left: 20px; margin-top: 10px;color:black;" type="text" bind:value={firstName}/>
                </div>
                <div>
                    <div>Last Name:</div>
                    <input  style = "margin-top: 10px;color:black;" type="text" bind:value={lastName}/>
                </div>
                <div>
                    <div style = "margin-left: 20px;">Discord:</div>
                    {#if !dis}
                    <a style = "margin-left: 20px; margin-top: 10px;" href="https://discord.com/api/oauth2/authorize?client_id=1091227125270450216&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fprofile%2Fverify&response_type=token&scope=identify">Verify Discord</a>
                    {/if}
                    {#if dis}
                    <div style = "margin-left: 20px; margin-top: 10px; margin-bottom: 20px;">{discord}</div>
                    {/if}
                </div>
                <div><button class = "bg-rose-200 px-5 py-2 rounded-sm" on:click={update}>Update</button></div>
            </div>
        </div>
    
    </body>



</SideNav>

