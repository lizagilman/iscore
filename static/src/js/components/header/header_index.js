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

    const coachHeader = <ManagerHeader type={'Coach'} first_name={first_name} last_name={last_name} />;
    const managerHeader = <ManagerHeader type={'Tournament Manager'} first_name={first_name} last_name={last_name} />;
    const umpireHeader = <ManagerHeader type={'Umpire'} first_name={first_name} last_name={last_name} />;
    const orgHeader = <ManagerHeader type={'Organization Manager'} first_name={first_name} last_name={last_name} />;


    const choose_header = () => {
      console.log('header');
      switch (localStorage.type) {
        case 'coach':
          return coachHeader;
        case 'manager':
          return managerHeader;
        case 'umpire':
          return umpireHeader;
        case 'organization':
          return orgHeader;
        default:
          return false;
      }
    };

    return <div>{choose_header()}</div>;
  }
}

