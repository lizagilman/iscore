/* eslint-disable */
import fetch from "isomorphic-fetch";

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

export function createTournamentApi(tournament) {
  return fetch("/api/ModifyTournaments/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
}

export function setTournamentCategories(tournamentCategory) {
  return fetch("/api/ModifyTournamentCategories/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournamentCategory)
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

export const getEntriesByTournamentCategoryIDApi = tournamentCategoryId =>
  fetch(`/api/Entries/?draw_list=${tournamentCategoryId}`).then(response =>
    response.json()
  );
export const getMatchesByTournamentCategoryIDApi = tournamentCategoryId =>
  fetch(`/api/Matches/?draws=${tournamentCategoryId}`).then(response =>
    response.json()
  );

export const getMatchesByTournamentCategoryIDAndStageApi = (
  tournamentCategoryId,
  stage
) =>
  fetch(`/api/Matches/?draws=${tournamentCategoryId}&stage=${stage}`).then(
    response => response.json()
  );

export function getOrganizationBySports(fieldOfSports) {
  return fetch(`/api/Organizations/?field_of_sports=${fieldOfSports}`).then(
    response => response.json()
  );
}

export function getRankingListByOrganization(organizationId) {
  return fetch(`/api/RankingLists/?organization=${organizationId}`).then(
    response => response.json()
  );
}

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

export const getTournamentCategoriesByTournament = tournamentId =>
  fetch(`/api/Draws/?tournamet=${tournamentId}`).then(response =>
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

export const generate_schedule = (
  tournamentId,
  numOfCourts,
  startHour,
  finishHour,
  gameduration
) =>
  fetch(
    `/generate_schedule/?tournament_id=${tournamentId}&num_of_courts=${numOfCourts}&start_hour=${startHour}&finish_hour=${finishHour}&game_duration=${gameduration} `
  ).then(response => response.json());

export const generate_draws = tournamentid =>
  fetch(`/generate_draws/?tournament_id=${tournamentid}`).then(response =>
    response.json()
  );

export const getAllMatchesApi = () =>
  fetch("/api/Matches/").then(response => response.json());

export const getAllEntriesApi = () =>
  fetch("/api/Entries/").then(response => response.json());

export const getAllDrawsApi = () =>
  fetch("/api/Entries/").then(response => response.json());

export const setTournamentApi = tournament =>
  fetch(`/apiTournaments/${tournament.id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response.json());
