import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export const user_id = writable(
  browser && (localStorage.getItem("user_id") || "")
);

export const username = writable(
  browser && (localStorage.getItem("username") || "")
);
export const first_name = writable(
  browser && (localStorage.getItem("first_name") || "")
);
export const last_name = writable(
  browser && (localStorage.getItem("last_name") || "")
);
export const riot_name = writable(
  browser && (localStorage.getItem("riot_name") || "")
);
export const riot_tag = writable(
  browser && (localStorage.getItem("riot_tag") || "")
);
export const user_type = writable(
  browser && (localStorage.getItem("user_type") || "")
);

user_id.subscribe((val) => browser && localStorage.setItem("user_id", val));
username.subscribe((val) => browser && localStorage.setItem("username", val));
first_name.subscribe(
  (val) => browser && localStorage.setItem("first_name", val)
);
last_name.subscribe((val) => browser && localStorage.setItem("last_name", val));
riot_name.subscribe((val) => browser && localStorage.setItem("riot_name", val));
riot_tag.subscribe((val) => browser && localStorage.setItem("riot_tag", val));
user_type.subscribe((val) => browser && localStorage.setItem("user_type", val));
