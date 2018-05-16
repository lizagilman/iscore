import { inject, observer } from 'mobx-react';
import React from 'react';
import MainCard from '../main_card/main_card_index';
import LeftMenu from './left_menu/left_menu_index';
import BasicInfo from '../tournament/basic_info/basic_info_index';

@inject('stores')
@observer
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.mainContentSwitcher = this.mainContentSwitcher.bind(this);

    this.state = {
      mainContent: <BasicInfo isForm={true} />,
      title: 'Basic Info',
      tournament: null,
    };
  }

  mainContentSwitcher(e, contentToDisplay, cardTitle) {
    e.preventDefault();

    this.setState({
      mainContent: contentToDisplay,
      title: cardTitle,
    });
  }

  componentWillMount() {
    const { TournamentStore } = this.props.stores;

    const tournamentId = parseInt(this.props.match.params.id, 10);

    TournamentStore.fetchTournament(tournamentId);
  }

  render() {
    return (
      <div id={'tindex'}>
        <LeftMenu
          zDepth={0}
          mainContentSwitcher={this.mainContentSwitcher}
          tournamentId={parseInt(this.props.match.params.id, 10)}
        />
        <MainCard
          title={this.state.title}
          content={this.state.mainContent}
          style={{ margin: '2% 0px 0px 15%', width: '80%' }}
        />
      </div>
    );
  }
}

export default Tournament;
