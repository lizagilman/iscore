import React from 'react';
import MainCard from '../main_card/main_card_index';
import TournamentsTable from './tournaments_table';

class Tournaments extends React.Component {
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <MainCard
          title={'Tournaments'}
          content={<TournamentsTable />}
          style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}

export default Tournaments;
