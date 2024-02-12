import type { PageLoad } from "./$types";
import { get } from 'svelte/store'
import { access_token } from "$lib/stores/tokenStore";
import { user_id } from "$lib/stores/userStore";
import { PUBLIC_API_ADDRESS } from '$env/static/public';

let token = get(access_token);
let uid = get(user_id);
// console.log(token);

export const load: PageLoad = ( async ({ params, fetch }) => {
    const res = await fetch(`${PUBLIC_API_ADDRESS}/api/teams/player/${uid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const jsonRes = await res.json();
    // console.log(jsonRes);
    return {
        team: jsonRes
    }
});
