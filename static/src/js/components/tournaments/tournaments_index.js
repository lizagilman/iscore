import React from 'react';
import MainCard from '../main_card/main_card_index';
import TournamentsTable from './tournaments_table';
import Header from '../header/header_index';

class Tournaments extends React.Component {
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <Header
          first_name={this.props.location.state.first_name}
          last_name={this.props.location.state.last_name}
        />
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
