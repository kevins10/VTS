<script lang="ts">
	import Card from "../Card.svelte";
	import type { CardProps } from "../Card.svelte";
	import LoadingSpinner from "../LoadingSpinner.svelte";

	// Prop fields
	export let title: String;
	export let items: CardProps[];

	export let isLoading: Boolean;
</script>

<div class="flex flex-col">
	<h1
		class="flex py-5 lg:pl-20 md:px-10 lg:ml-32 md:mr-20 text-4xl text-rose-400"
	>
		{title}
	</h1>
	{#if isLoading === true}
		<LoadingSpinner />
	{:else}
		<div
			class="flex overflow-x-scroll mx-10 pb-10 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-grey-300"
		>
			<div class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
				{#each items as item}
					<Card cardProps={item} />
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.scrollbar-thin::-webkit-scrollbar-thumb,
	.scrollbar-thin::-webkit-scrollbar-track {
		border-radius: 92px;
	}
</style>
