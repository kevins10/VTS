<script lang="ts">
    import {page} from '$app/stores'
    import axios from 'axios';
    import {onMount} from 'svelte'
    import { user_id, first_name, last_name, riot_name, riot_tag } from '$lib/stores/userStore'
    console.log("page.path: ", $page.url.pathname)
    // window.onload = () => {
    //     const fragment = new URLSearchParams(window.location.hash.slice(1))
    //     const access_token = fragment.get('access_token')
    //     const token_type = fragment.get('token_type')
    //     console.log("token type: ", token_type)
    //     console.log("access token: ", access_token)
    // }
    
    onMount(async () =>{
        var obj: any
        var data: any
        const fragment = new URLSearchParams(window.location.hash.slice(1))
        const access_token = fragment.get('access_token')
        const token_type = fragment.get('token_type')
        console.log("token type: ", token_type)
        console.log("access token: ", access_token)
        const promise = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${token_type} ${access_token}`
                }
            })
            .then(function (response) {
                // redirect user to their homepage
                console.log("response: ", response)
                obj = response
                data = {
                    discord: `${obj.data.username}#${obj.data.discriminator}`
                }
            })
            .catch(function (error) {
                console.log(error)
            });

            const update = await axios.patch(`http://localhost:3000/api/users/update/discord/${$user_id}`, data)
                            .then((response) => console.log("response: ", response))


        
        })

        

        
    

</script>

<h1 style="color: aliceblue;">Thanks for linking your discord account :D</h1>

<a href="/">go back</a>
