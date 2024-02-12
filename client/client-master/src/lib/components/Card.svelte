<script context="module" lang="ts">
	export type CardProps = {
		header: string;
		body: string;
		buttonText: string;
		buttonUrl: string;
	};
</script>

<script lang="ts">
	import logo from "$lib/images/valorantLogo.png";
	import { goto } from "$app/navigation";

	export let cardProps: CardProps;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="min-w-[200px] max-w-[200px] mx-5 min-h-full rounded overflow-hidden shadow-lg bg-transparent"
	on:click={() => {
		goto(cardProps.buttonUrl);
	}}
>
	<a href="#!">
		<img class="rounded-t-lg" src={logo} alt="" />
	</a>
	<div class="my-auto px-6 py-5 min-h-[190px] max-h-[190px] bg-zinc-200">
		<div class="font-bold text-xl mb-2">{cardProps.header}</div>
		<p class="text-gray-700 text-base">{cardProps.body}</p>
	</div>
</div>

<!-- <div class="flex justify-center mx-5">
	<div
		class="block max-w-sm min-w-0 rounded-lg bg-white shadow-lg dark:bg-neutral-700"
	>
		<a href="#!">
			<img
				class="rounded-t-lg"
				src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
				alt=""
			/>
		</a>
		<div class="p-6">
			<h5
				class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
			>
				{cardProps.header}
			</h5>
			<p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
				{cardProps.body}
			</p>
			<button
				type="button"
				class="inline-block rounded bg-rose-200 text-center px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
				data-te-ripple-init
				data-te-ripple-color="light"
				on:click={() => {
					goto(cardProps.buttonUrl);
				}}
			>
				{cardProps.buttonText}
			</button>
		</div>
	</div>
</div> -->

<!-- <div class="inline-block px-3 justify-center">
  <h2>{header}</h2>
  <div
    class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
  >
    <p>{body}</p>
  </div>
</div> -->
