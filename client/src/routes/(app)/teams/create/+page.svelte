<script lang="ts">
	import { user_id } from "$lib/stores/userStore";
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import axios from "axios";
	import { access_token } from "$lib/stores/tokenStore";
	import SideNav from "$lib/components/SideNav.svelte";

	export const token = $access_token;
	export const userId = $user_id;

	const formInputStyle =
		"mt-1 w-60 text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none";

	let fields = {
		name: "",
		acronym: "",
	};
	let errors = {
		name: "",
		acronym: "",
	};
	let valid = false;
	let errorMsg = "";

	const validateForm = () => {
		valid = true;
		if (fields.name.trim().length < 1) {
			valid = false;
			errors.name = "Team Name cannot be empty";
		} else {
			errors.name = "";
		}
		if (fields.acronym.trim().length < 1) {
			valid = false;
			errors.acronym = "Team Acronym cannot be empty";
		} else {
			errors.acronym = "";
		}
	};

	const submitHandler = async () => {
		validateForm();

		if (valid) {
			await axios
				.post(
					`${PUBLIC_API_ADDRESS}/api/teams/create/${userId}`,
					{
						team_name: fields.name,
						team_acronym: fields.acronym,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					console.log(response.data);
					window.location.replace("/teams/create");
				})
				.catch((error) => {
					console.log(error);
					if (error.response) {
						// request was made, but server responded with a status code that falls out of the 2xx range
						errorMsg = error.response.data.message;
					} else if (error.request) {
						// request was made, but no response was received
						console.log(error.request);
					} else {
						// some other error
						console.log(error);
					}
				});
		}
	};
</script>

<SideNav page="teams">
	<div class="create-team h-screen overflow-y-auto">
		<div class="form form flex items-center h-screen">
			<div class="w-fit px-7 py-12 m-auto shadow-lg bg-grey-850 rounded-md">
				<div class="flex justify-center">
					<h1
						class="text-rose-200 font-poppins font-semibold text-4xl cursor-pointer"
					>
						Create a New Team
					</h1>
				</div>

				<form on:submit|preventDefault={submitHandler}>
					<div class="flex justify-center">
						<div class="mt-9 mx-5">
							<label for="name" class="text-base text-zinc-300 mb-2"
								>Team Name</label
							><br />
							<input
								type="text"
								id="name"
								class={formInputStyle}
								bind:value={fields.name}
							/><br />
							<div class="error text-red text-sm mt-1">{errors.name}</div>
						</div>

						<div class="mt-9 mx-5">
							<label for="acronym" class="text-base text-zinc-300 mb-2"
								>Team Acronym</label
							><br />
							<input
								type="text"
								id="acronym"
								class={formInputStyle}
								bind:value={fields.acronym}
								on:keyup={() => {
									fields.acronym = fields.acronym.toUpperCase();
								}}
							/><br />
							<div class="error text-red text-sm mt-1">{errors.acronym}</div>
						</div>
					</div>

					<div class="mt-6 flex flex-row justify-center items-center">
						<button
							type="submit"
							class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300"
							>Create Team</button
						>
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
