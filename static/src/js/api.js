import fetch from 'isomorphic-fetch';

export const getAllTournamentsApi = () =>
  fetch('/api/Tournaments/').then(response => response.json());

export const editTournamentApi = tournament =>
  fetch(`/api/Tournaments/${tournament.id}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  }).then(response => response.json());

export const createTournamentApi = tournament =>
  fetch('/api/Tournaments/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  }).then(response => response.json());

export const deleteTournamentApi = tournament =>
  fetch(`/api/Tournaments/${tournament.id}/`, {
    method: 'Delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournament),
  }).then(response => response.json());

export const getAllTournamentsByManagerApi = data =>
  fetch(`/api/Tournaments/?manager=${data.manager_id}`).then(response =>
    response.json());

export const getTournamentsByIDApi = data =>
  fetch(`/api/Tournaments/${data.tournament_id}/`).then(response =>
    response.json());

export const getEntriesByDrawListIDApi = data =>
  fetch(`/api/Entries/?draw_list=${data.draw_list_id}`).then(response =>
    response.json());

export const getMatchesByDrawListIDApi = data =>
  fetch(`/api/Matches/?draws=${data.draw_list_id}`).then(response =>
    response.json());

export const getMatchesByDrawListIDAndStageApi = data =>
  fetch(`/api/Matches/?draws=${data.draw_list_id}&stage=${data.stage}`).then(response => response.json());

// get all organization by field of sport

export const getOrganizationBySports = data =>
  fetch(`/api/Organizations/?field_of_sports=${data.sports}`).then(response =>
    response.json());

export const getRankingListByOrganization = data =>
  fetch(`/api/RankingLists/?organization=${data.organization}`).then(response =>
    response.json());

export const getCategoriesByRankingList = data =>
  fetch(`/api/catagories/?rankings_list_catagories__list=${data.ranking_list}`).then(response => response.json());

// get all grades by ranking list (or organization)??

// get all money distribution methods by organization

// get all money distribution methods by tournament manager

// generate schedule by tournament id,

// generate draw by tournament id

// delete schedule by tournament id

// delete draw by category id by tournament
