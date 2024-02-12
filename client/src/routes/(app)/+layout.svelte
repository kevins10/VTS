<script>
	import { authCheck } from "$lib/common/authCheck";
	import { onMount } from "svelte";

	onMount(() => {
		authCheck();
	});
</script>

<main class="ml-[100px]">
	<slot />
</main>
