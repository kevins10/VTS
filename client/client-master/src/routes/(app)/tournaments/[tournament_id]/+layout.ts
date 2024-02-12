import type { LayoutLoad } from "./$types";
import { PUBLIC_API_ADDRESS } from '$env/static/public';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const res = await fetch(
		`${PUBLIC_API_ADDRESS}/api/tournaments/` + params.tournament_id
	);
	const jsonRes = await res.json();

	return {
		tournament: jsonRes,
	};
};
