export type Tournament = {
	tournament_id: number;
	tournament_name: string;
	match_ids: string[];
	max_teams: number;
	tournament_format: string;
	description: string;
	prize_pool: number;
	start_date: string;
	end_date: string;
	createdAt: string;
	updatedAt: string;
};

export type Team = {
	team_name: string;
	team_acronym: string;
	match_ids?: [];
	created_date: string;
};

export type Player = {
	join_date: string;
	player: {
		discord: string;
		username: string;
		first_name: string;
		last_name: string;
		profilePicture: string;
		riot_name: string;
		riot_tag: string;
	};
};

export type Roster = Player[];
