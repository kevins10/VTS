import type { Team } from "$lib/common/types";
import type { PageLoad } from "./$types";
import { PUBLIC_API_ADDRESS } from "$env/static/public";

export const load = (async ({ params, fetch }): Promise<Team> => {
	const res = await fetch(
		`${PUBLIC_API_ADDRESS}/api/teams/${params.team_name}`
	);
	const team: Team = await res.json().catch(() => window.location.replace("/"));

	return team;
}) satisfies PageLoad;
