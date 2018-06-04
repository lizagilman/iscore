import React from 'react';
import MainCard from '../main_card/main_card_index';
import RankingTable from './ranking_table';
import { inject, observer } from 'mobx-react/index';

@inject('stores')
@observer
export default class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rankingListName: this.props.location.state
        ? this.props.location.state.name
        : '',
    };
  }

  componentWillMount() {
    // TO-DO: parse id from url and fetch ranking list name

    // if (!(this.state.rankingListName) {
    //
    // }
  }

  render() {
    return (
      <div>
        <MainCard
          title={this.state.rankingListName || 'Ranking List'}
          content={<RankingTable {...this.props} />}
          style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}
