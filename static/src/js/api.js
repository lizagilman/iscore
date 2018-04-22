import fetch from "isomorphic-fetch";

export const getAllTournamentsApi = () =>
  fetch("/api/Tournaments/").then(response => response.json());
export const editTournamentApi = tournament =>
  fetch(`/api/Tournaments/${tournament.id}/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
export const createTournamentApi = tournament =>
  fetch("/api/Tournaments/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
export const deleteTournamentApi = tournament =>
  fetch(`/api/Tournaments/${tournament.id}/`, {
    method: "Delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tournament)
  }).then(response => response);
export const getAllTournamentsByManagerApi = managerId =>
  fetch(`/api/Tournaments/?manager=${managerId}`).then(response =>
    response.json()
  );
export const getTournamentsByIDApi = tournamentId =>
  fetch(`/api/Tournaments/${tournamentId}/`).then(response => response.json());
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
export const getOrganizationBySports = fieldOfSports =>
  fetch(`/api/Organizations/?field_of_sports=${fieldOfSports}`).then(response =>
    response.json()
  );
export const getRankingListByOrganization = organizationId =>
  fetch(`/api/RankingLists/?organization=${organizationId}`).then(response =>
    response.json()
  );
export const getCategoriesByRankingList = rankingListId =>
  fetch(
    `/api/catagories/?rankings_list_catagories__list=${rankingListId}`
  ).then(response => response.json());
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

// alisa test functions

export const getAllMatchesApi = () =>
  fetch('/api/Matches/').then(response => response.json());

export const getAllEntriesApi = () =>
  fetch('/api/Entries/').then(response => response.json());

export const getAllDrawsApi = () =>
  fetch('/api/Entries/').then(response => response.json());

export const setTournamentApi = tournament =>
  fetch(`/apiTournaments/${tournament.id}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  }).then(response => response.json());
