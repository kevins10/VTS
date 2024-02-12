<script lang="ts">
	import { PUBLIC_API_ADDRESS } from "$env/static/public";
	import { goto } from "$app/navigation";
	import {
		first_name,
		last_name,
		riot_name,
		riot_tag,
	} from "$lib/stores/userStore";
	import axios from "axios";

	let email = "";
	let password = "";
	let errorMsg = "";
	let errors = {
		email: "",
		password: "",
	};
	let valid = false;
	let showPwd = false;

	const validateForm = () => {
		valid = true;
		if (email.trim().length < 1) {
			valid = false;
			errors.email = "Email cannot be empty";
		} else {
			errors.email = "";
		}
		if (password.trim().length < 1) {
			valid = false;
			errors.password = "Password cannot be empty";
		} else {
			errors.password = "";
		}
	};

	function fetchUserData() {
		const access_token = localStorage.getItem("access_token");
		console.log(access_token);
		if (access_token) {
			axios
				.get(`${PUBLIC_API_ADDRESS}/api/auth/protected`, {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then((response) => {
					const data = response.data;

					localStorage.setItem("user_id", data.user_id);
					localStorage.setItem("first_name", data.first_name);
					localStorage.setItem("last_name", data.last_name);
					localStorage.setItem("username", data.username);
					localStorage.setItem("riot_name", data.riot_name);
					localStorage.setItem("riot_tag", `#${data.riot_tag}`);
					localStorage.setItem("user_type", data.user_type);
				})
				.catch((e) => console.log(e));
		} else {
			errorMsg = "Session expired, please try logging in again";
		}
	}

	function submitHandler() {
		validateForm();

		if (valid) {
			axios
				.post(
					`${PUBLIC_API_ADDRESS}/api/auth/login`,
					{
						email,
						password,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
				.then(function (response) {
					console.log(response.data);
					const access_token = response.data.access_token;
					localStorage.setItem("access_token", access_token);
				})
				.then(() => {
					fetchUserData();
					window.location.replace("/");
				})
				.catch(function (error) {
					console.log(error);
					if (error.response) {
						const { status } = error.response;
						if (status === 401) {
							errorMsg = error.response.data.message;
						}
					}
				});
		} else {
			errorMsg = "Invalid username/email or password. Please try again";
		}
	}

	const handleInput = (event) => {
		password = event.target.value;
	};

	const togglePassword = () => {
		showPwd = !showPwd;
	};
</script>

<div class="login bg-grey-1000">
	<div class="form flex justify-center items-center h-screen">
		<div class="w-96 px-7 py-12 shadow-lg bg-grey-850 rounded-md">
			<div class="flex justify-center">
				<h1
					class="text-rose-200 font-poppins font-semibold mr-8 text-4xl underline underline-offset-8 cursor-pointer"
				>
					LOGIN
				</h1>
				<h1
					class="text-zinc-400 font-poppins font-semibold text-4xl transition hover:text-zinc-300"
				>
					<a href="/signup">SIGN UP</a>
				</h1>
			</div>

			<form on:submit|preventDefault={submitHandler}>
				<div class="mt-9 mx-5">
					<label for="email" class="text-base text-zinc-300 mb-2">Email</label
					><br />
					<input
						type="email"
						id="email"
						class="mt-1 w-full text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none"
						bind:value={email}
					/><br />
					<div class="error text-red text-sm mt-1">{errors.email}</div>
				</div>

				<div class="mt-6 mx-5">
					<label for="password" class="text-base text-zinc-300 mb-2"
						>Password</label
					><br />
					<div class="relative">
						<input
							type={showPwd ? "text" : "password"}
							id="password"
							class="js-password mt-1 w-full text-base px-2 py-2 bg-grey-600 text-white rounded-sm focus:outline-none"
							on:input={handleInput}
						/><br />
						{#if showPwd}
							<button
								on:click|preventDefault={togglePassword}
								class="absolute top-1/2 right-3 -translate-y-1.5"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									class="bi bi-eye-slash-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
									/>
									<path
										d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
									/>
								</svg>
							</button>
						{:else}
							<button
								on:click|preventDefault={(togglePassword) =>
									(showPwd = !showPwd)}
								class="absolute top-1/2 right-3 -translate-y-1.5"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="%000000"
									class="bi bi-eye-fill"
									viewBox="0 0 16 16"
								>
									<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
									<path
										d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
									/>
								</svg>
							</button>
						{/if}
					</div>
					<div class="error text-red text-sm mt-1">{errors.password}</div>
				</div>

				<div class="mt-6 flex flex-row justify-center items-center">
					<button
						type="submit"
						class="bg-rose-200 py-2 px-12 text-white rounded-full transition hover:bg-rose-300"
						>Login</button
					>
				</div>
			</form>

			{#if errorMsg}
				<div class="mt-6 flex flex-row justify-center items-center">
					<p class="error text-zinc-300">{errorMsg}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
