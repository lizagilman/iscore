import React from 'react';
import MainCard from '../main_card/main_card_index';
import RankingsTable from './rankings_table';

const Rankings = () => <div>
  <MainCard
    title={'Rankings'}
    content={<RankingsTable />}
    style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
  />
</div>;

export default Rankings;
