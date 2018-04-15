import fetch from 'isomorphic-fetch';

export const getAllTournamentsApi = () =>
  fetch('/apiTournaments/').then(response => response.json());

export const getAllMatchesApi = () =>
  fetch('/apiMatches/').then(response => response.json());

export const getAllEntriesApi = () =>
  fetch('/apiEntries/').then(response => response.json());

export const setTournamentApi = tournament => fetch(`/apiTournaments/${tournament.id}/`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tournament),
}).then(response => response.json());
