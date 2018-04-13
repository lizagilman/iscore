import React from 'react';
import MainCard from '../main_card/main_card_index';
import LeftMenu from './left_menu/left_menu_index';
import BasicInfo from '../tournament/basic_info/basic_info_index';

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

  render() {
    return (
      <div>
        <LeftMenu zDepth={0} mainContentSwitcher={this.mainContentSwitcher} />
        <MainCard
          title={this.state.title}
          content={this.state.mainContent}
          style={{ flex: 1, margin: '1vw 2vw 0 15vw' }}
        />
      </div>
    );
  }
}

export default Tournament;
