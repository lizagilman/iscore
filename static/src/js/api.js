import fetch from 'isomorphic-fetch';

export const getAllTournamentsApi = () =>
  fetch('/api/Tournaments/').then(response => response.json());

export const setTournamentApi = tournament => fetch(`/api/Tournaments/${tournament.id}/`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tournament),
}).then(response => response.json());
