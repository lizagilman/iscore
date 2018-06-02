import React from 'react';
import * as mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import Tabs from 'material-ui/Tabs/Tabs';
import Spinner from '../spinner/spinner';
import * as RankingListBody from './ranking_body';

@inject('stores')
@observer
export default class RankingList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { categoryToDisplay: null, data: null };
  }

  componentWillMount() {
    const { RankingStore } = this.props.stores;

    const id = parseInt(this.props.match.params.id, 10);

    RankingStore.fetchRankingList(id).then((ranking) => {
      const data = mobx.toJS(ranking);

      Object.keys(data).forEach((category, index) => {
        if (data[category].length && !this.state.categoryToDisplay) {
          this.setState({ categoryToDisplay: index });
        }
      });

      this.setState({ data });
    });
  }

  handleChange = (category) => {
    this.setState({
      categoryToDisplay: category,
    });
  };

  render() {
    return (
      <div>
        {this.state.data && this.state.categoryToDisplay ? (
          <Tabs
            value={this.state.categoryToDisplay}
            onChange={this.handleChange}
          >
            {RankingListBody.createTabs(this.state.data)}
          </Tabs>
        ) : (
          Spinner(70)
        )}
      </div>
    );
  }
}
