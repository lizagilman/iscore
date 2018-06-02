import React from 'react';
import MainCard from '../main_card/main_card_index';
import RankingTable from './ranking_table';

export default class Ranking extends React.Component {
  render() {
    return (
      <div>
        <MainCard
          title={'Rankings'}
          content={<RankingTable {...this.props} />}
          style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}
