import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const access_token = writable(
  browser && (localStorage.getItem("access_token") || "")
);
access_token.subscribe(
  (val) => browser && localStorage.setItem("access_token", val)
);
