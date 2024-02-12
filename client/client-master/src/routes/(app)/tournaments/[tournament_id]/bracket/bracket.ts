import type { Team } from "$lib/common/types";

export type Match = {
    team1: string|null;
    team1_score: number;
    team2: string|null;
    team2_score: number;
    winner: string|null;
}

export type Round = {
    matches: Match[];
}

export type Bracket = {
    rounds: Round[];
}

export const generateEmptyBracket = (tournament_format: string) => {
    
    let length = 0;
    if (tournament_format === "RO8") {
        length = 8;
    } else if (tournament_format === "RO16") {
        length = 16;
    } else {
        length = 32;
    }
    
    const rounds: Round[] = [];

    // calculate the number of rounds based on the number of teams
    const numRounds = Math.ceil(Math.log2(length));
    // console.log(numRounds);

    // generate the matches for each round
    for (let i = 0; i < numRounds; i++) {
        const round = { 
            matches: Array()
        };
        const numMatches = length / Math.pow(2, i + 1);
        // console.log(numMatches);

        for (let j = 0; j < numMatches; j++) {
            round.matches.push({ 
                team1: "", 
                team1_score: 0,
                team2: "", 
                team2_score: 0,
                winner: "" 
            });
        }

        rounds.push(round);
    }

    // console.log(rounds);
    return {
        rounds: rounds
    }
}

export const generateBracket = (tournament_format: string, teams: Team[]) => {
    const bracket = generateEmptyBracket(tournament_format)
    const rounds = bracket.rounds.length;
    console.log("rounds:  "+ rounds)

    // assign the teams to the first round
    const numTeams = teams.length;

    let roundOf = Math.pow(2, rounds)
    let diff = roundOf - numTeams;
    let halfLength = roundOf / 2;
    console.log("diff: " + diff);

    let teamNames = teams.map(team => team.team_name);

    if (numTeams !== roundOf) {
        let names = teams.map(team => team.team_name);
        let arr = new Array(roundOf);

        console.log(arr);
        
        // clear teamNames
        teamNames.splice(0, teamNames.length);
        let topIndex = 0;
        let bottomIndex = arr.length - 1;;

        while (names.length > 0) {
            arr[topIndex] = names.shift();
            topIndex+=2;

            arr[bottomIndex] = names.shift();
            bottomIndex-=2;
        }

        console.log(names);
        console.log("arr: " + arr);

        // Fill any remaining empty spots with "Bye"
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                arr[i] = "Bye";
            }
        }
        console.log(arr);
        teamNames = arr;
    }

    console.log(teamNames);

    const firstRound = bracket.rounds[0];

    for (let i = 0; i < teamNames.length; i += 2) {
        const match = firstRound.matches[i / 2];
        match.team1 = teamNames[i];
        match.team2 = teamNames[i + 1];
    }

    console.log(bracket);
    return {
        rounds: bracket.rounds
    }
}

export const updateBracket = (bracket: Bracket) => {
    // console.log(bracket);

    bracket.rounds.forEach( (round: Round, i: number) => {
        let prevRound: Round;
        if (i > 0) {
            prevRound = bracket.rounds[i - 1];
        }

        round.matches.forEach( (match: Match, j: number) => {
            if (match.team1 === "Bye") {
                match.winner = match.team2;
            } else if (match.team2 === "Bye") {
                match.winner = match.team1;
            } else if (match.team1_score > match.team2_score) {
                match.winner = match.team1;
            } else if (match.team2_score > match.team1_score) {
                match.winner = match.team2;
            }

            if (i > 0) {
                const prevMatch1 = prevRound.matches[j * 2];
                const prevMatch2 = prevRound.matches[j * 2 + 1];
                // console.log("prevMatch1: " + JSON.stringify(prevMatch1));
                // console.log("prevMatch2: " + JSON.stringify(prevMatch2));

                if (prevMatch1.winner === prevMatch1.team1) {
                    match.team1 = prevMatch1.team1;
                } else if (prevMatch1.winner === prevMatch1.team2){
                    match.team1 = prevMatch1.team2;
                }

                if (prevMatch2.winner === prevMatch2.team1) {
                    match.team2 = prevMatch2.team1;
                } else if (prevMatch2.winner === prevMatch2.team2){
                    match.team2 = prevMatch2.team2;
                }
            }
        });
    })
    // console.log(bracket);
    return bracket;
}
