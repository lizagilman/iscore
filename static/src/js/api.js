import fetch from 'isomorphic-fetch';

export const getAllTournamentsApi = () =>
  fetch('/api/Tournaments/').then(response => response.json());

export const getAllMatchesApi = () =>
  fetch('/api/Matches/').then(response => response.json());

export const getAllEntriesApi = () =>
  fetch('/api/Entries/').then(response => response.json());

export const getAllDrawsApi = () =>
  fetch('/api/Entries/').then(response => response.json());

export const setTournamentApi = tournament => fetch(`/apiTournaments/${tournament.id}/`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tournament),
}).then(response => response.json());
