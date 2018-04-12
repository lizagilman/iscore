import fetch from 'isomorphic-fetch';

export const getAllTournamentsApi = () =>
  fetch('/apiTournaments/').then(response => response.json());
