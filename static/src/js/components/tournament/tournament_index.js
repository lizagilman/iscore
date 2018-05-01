import React from 'react';
import MainCard from '../main_card/main_card_index';
import LeftMenu from './left_menu/left_menu_index';
import BasicInfo from '../tournament/basic_info/basic_info_index';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.mainContentSwitcher = this.mainContentSwitcher.bind(this);

    this.state = {
      mainContent: <BasicInfo isForm={true} />,
      title: 'Basic Info',
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

    TournamentStore.getCategories();
  }

  render() {
    return (
      <div id={'tindex'}>
        <LeftMenu zDepth={0} mainContentSwitcher={this.mainContentSwitcher} />
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
