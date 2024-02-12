<script lang="ts">
	import type { Player } from "$lib/common/types";
	import PlayerAvatarSvg from "$lib/images/PlayerAvatarSVG.svelte";

	export let playerModalProps: Player;

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
		console.log(showModal);
	};
</script>

<button
	type="button"
	class="inline-block rounded bg-rose-200 text-center px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
	data-te-ripple-init
	data-te-ripple-color="light"
	on:click={toggleModal}
>
	View More
</button>
{#if showModal}
	<div
		class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex px-10"
	>
		<div class="relative w-auto my-6 mx-auto max-w-6xl min-w-1/2">
			<!--content-->
			<div
				class="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-zinc-500"
			>
				<!--header-->
				<div
					class="flex items-start justify-between p-5 border-b border-solid rounded-t"
				>
					{#if playerModalProps.player.profilePicture === null}
						<PlayerAvatarSvg />
					{:else}
						<img
							src={`data:image/png;base64,${playerModalProps.player.profilePicture}`}
							alt="profile picture"
						/>
					{/if}
					<h3 class="text-2xl font-semibold text-zinc-300 my-auto">
						{playerModalProps.player.username}
					</h3>
					<button
						class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
						on:click={toggleModal}
					/>
				</div>
				<!--body-->
				<div class="relative p-6 flex-auto">
					<div class="flex items-center gap-1">
						<p class="text-rose-100">Name:</p>
						<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
							{playerModalProps.player.first_name}
							{playerModalProps.player.last_name}
						</p>
					</div>
					<div
						class="flex items-center gap-1
          "
					>
						<p class="text-rose-100">Joined:</p>
						<p class="my-4 text-blueGray-700 text-lg leading-relaxed">
							{playerModalProps.join_date}
						</p>
					</div>
					<div class="flex items-center gap-1">
						<p class="text-rose-100">Riot ID</p>
						<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
							{playerModalProps.player.riot_name}
							{playerModalProps.player.riot_tag}
						</p>
					</div>
					{#if playerModalProps.player.discord != null}
						<div class="flex items-center gap-1">
							<p class="text-rose-100">Discord:</p>
							<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
								{playerModalProps.player.discord}
							</p>
						</div>
					{/if}
				</div>
				<!--footer-->
				<div
					class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
				>
					<button
						type="button"
						class="rounded bg-rose-200 text-center px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
						data-te-ripple-init
						data-te-ripple-color="light"
						on:click={toggleModal}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="opacity-25 fixed inset-0 z-40 bg-black" />
{/if}
