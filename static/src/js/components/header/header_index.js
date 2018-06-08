import React from 'react';
import ManagerHeader from '../tournaments_header/tournaments_header';

const styles = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
  },
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const first_name = localStorage.first_name;
    const last_name = localStorage.last_name;

    const coachHeader = <ManagerHeader is_manager={false} is_coach={true} first_name={first_name} last_name={last_name} />;
    const managerHeader = <ManagerHeader is_manager={true} is_coach={false} first_name={first_name} last_name={last_name} />;
    const notManagerHeader = <ManagerHeader is_manager={false} is_coach={false} first_name={first_name} last_name={last_name} />;


    const choose_header = () => {
      console.log('header');
      switch (localStorage.type) {
        case 'coach':
          return coachHeader;
        case 'manager':
          return managerHeader;
        case 'umpire':
          return notManagerHeader;
        case 'organization':
          return notManagerHeader;
        default:
          return false;
      }
    };

    return <div>{choose_header()}</div>;
  }
}

