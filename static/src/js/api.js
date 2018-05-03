/* eslint-disable */
import fetch from "isomorphic-fetch";
/////////////////Tournament/////////////////
export function getAllTournamentsApi() {
  return fetch("/api/Tournaments/").then(response => response.json());
}

export function editTournamentApi(tournament) {
  return fetch(`/api/ModifyTournaments/${tournament.id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
}

export const setTournamentApi = tournament =>
  fetch(`/api/ModifyTournaments/${tournament.id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response.json());

//in
export function createTournamentApi(tournament) {
  //return fetch("/api/ModifyTournaments/", {
  return fetch("/CreateTournament/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
}

export function deleteTournamentApi(id) {
  return fetch(`/api/Tournaments/${id}/`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => response);
}

export function getAllTournamentsByManagerApi(managerId) {
  return fetch(`/api/Tournaments/?manager=${managerId}`).then(response =>
    response.json()
  );
}

export function getTournamentByIDApi(tournamentId) {
  return fetch(`/api/Tournaments/${tournamentId}/`).then(response =>
    response.json()
  );
}

///////////////////////////////////////
//////////////organization/////////////
export const getOrganizationBySports = fieldOfSports =>
  fetch(`/api/Organizations/?field_of_sports=${fieldOfSports}`).then(response =>
    response.json()
  );

export const getRankingListByOrganization = organizationId =>
  fetch(`/api/RankingLists/?organization=${organizationId}`).then(response =>
    response.json()
  );

export function getCategoriesByRankingList(rankingListId) {
  return fetch(
    `/api/catagories/?rankings_list_catagories__list=${rankingListId}`
  ).then(response => response.json());
}

export const getGradesByRankingList = rankingListId =>
  fetch(`/api/Grades/?ranking_lists=${rankingListId}`).then(response =>
    response.json()
  );

export const getGradesByOrganization = organizationId =>
  fetch(`/api/Grades/?ranking_lists__organization=${organizationId}`).then(
    response => response.json()
  );

export const getPointsMethodsByOrganization = organizationId =>
  fetch(
    `/api/PointsDistributionMethods/?grades__ranking_lists__organization=${organizationId}`
  ).then(response => response.json());

export const getMoneyMethodsByOrganization = organizationId =>
  fetch(
    `/api/MoneyDistributionMethods/?grades__ranking_lists__organization=${organizationId}`
  ).then(response => response.json());

//////////////////////////////////////////
////////////////Coach/////////////////////
export function getAllCoachPlayersApi(name) {
  return fetch(`/api/Coachs/?name=${name}`).then(response => response.json());
}
///////////////////////////////////

/////////////////Entries////////////////
export const getAllEntriesApi = () =>
  fetch("/api/Entries/").then(response => response.json());

export function getEntriesApi(catName, tourId) {
  return fetch(
    `/api/Entries/?tournament_category__category=${catName}&tournament_category__tournament=${tourId}`
  ).then(response => response.json());
}

export const getEntriesByTournamentCategoryIDApi = tournamentCategoryId =>
  fetch(
    `/api/Entries/?tournament_category=${tournamentCategoryId}&ordering=rank`
  ).then(response => response.json());

export function registerCoachPlayerToTournament(entry) {
  return fetch("/api/ModifyEntries/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entry)
  }).then(response => response);
}

export const getAllDrawsApi = () =>
  fetch("/api/Entries/").then(response => response.json()); ///probably old function ,not relevant

////////////////  matches  //////////////////

export function getMatchToWriteByMatchId(id) {
  return fetch(`/api/ModifyMatches/${id}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}

export function DeleteMatchesApi(id) {
  return fetch(`/api/ModifyMatches/${id}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => response);
}

//match object must contain category id
export function editMatchesApi(match) {
  return fetch(`/api/ModifyMatches/${match.id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(match)
  }).then(response => response);
}

export const getMatchesByTournamentCategoryIDApi = tournamentCategoryId =>
  fetch(`/api/Matches/?category=${tournamentCategoryId}`).then(response =>
    response.json()
  );

export const getMatchesByTournamentCategoryIDAndStageApi = (
  tournamentCategoryId,
  stage
) =>
  fetch(`/api/Matches/?category=${tournamentCategoryId}&stage=${stage}`).then(
    response => response.json()
  );

export const getAllMatchesApi = () =>
  fetch("/api/Matches/").then(response => response.json());

export const updateMatchWinnerApi = (matchId, winnerID) =>
  fetch(`/update_match_winner/?winner_id=${matchId}&match_id=${winnerID}`).then(
    response => response
  );

export const getAllMatchesByTournamentIDApi = tournID =>
  fetch(`/api/Matches/?category__tournamet=${tournID}`).then(response =>
    response.json()
  );

////////////////////////////////////////////

//////////////////////////////tournament categories
export const getTournamentCategoriesByTournament = tournamentId =>
  fetch(`/api/TournamentCategories/?tournamet=${tournamentId}`).then(response =>
    response.json()
  );

export const getTournamentCategoriesByTournamentAndPlayerName = (
  tournamentId,
  playerName
) =>
  fetch(
    `/api/Draws/?tournamet=${tournamentId}&player_list__name=${playerName}`
  ).then(response => response.json());

export const createTournamentCategoryApi = TournamentCategory =>
  fetch("/api/Draws/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(TournamentCategory)
  }).then(response => response);

/////////////////////////////

/////////////////////////////functions in api

export const generateScheduleApi = params => {
  const {
    tournamentId,
    numOfCourts,
    startHour,
    finishHour,
    matchDuration
  } = params;
  return fetch(
    `/generate_schedule/?tournament_id=${tournamentId}&num_of_courts=${numOfCourts}&start_hour=${startHour}&finish_hour=${finishHour}&game_duration=${matchDuration} `
  ).then(response => response);
};

export const deleteScheduleApi = tournament_id => {
  return fetch(`/delete_schedule/?tournament_id=${tournament_id}`).then(
    response => response
  );
};
export const generateDraws = categoryid =>
  fetch(`/generate_draws/?category_id=${categoryid}`).then(response =>
    response.json()
  );

export const deleteDraws = categoryid => {
  return fetch(`/delete_draws/?category_id=${categoryid}`).then(
    response => response
  );
};
