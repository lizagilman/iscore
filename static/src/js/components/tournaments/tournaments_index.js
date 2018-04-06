/* eslint-disable */

import React from 'react';
import MainCard from '../main_card/main_card_index';

class Tournaments extends React.Component {
  render() {
    return (
      <div>
        <MainCard
          title={'Tournaments'}
          content={'I am content tournaments'}
          style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}

export default Tournaments;
