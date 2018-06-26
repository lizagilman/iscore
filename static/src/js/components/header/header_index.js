import React from 'react';
import ManagerHeader from '../tournaments_header/tournaments_header';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const first_name = localStorage.first_name;
    const last_name = localStorage.last_name;
    const coachHeader = (
      <ManagerHeader
        type={'Coach'}
        first_name={first_name}
        last_name={last_name}
        headerSwitcher={this.props.headerSwitcher}
      />
    );
    const managerHeader = (
      <ManagerHeader
        type={'Tournament Manager'}
        first_name={first_name}
        last_name={last_name}
        headerSwitcher={this.props.headerSwitcher}
      />
    );
    const umpireHeader = (
      <ManagerHeader
        type={'Umpire'}
        first_name={first_name}
        last_name={last_name}
        headerSwitcher={this.props.headerSwitcher}
      />
    );
    const orgHeader = (
      <ManagerHeader
        type={'Organization Manager'}
        first_name={first_name}
        last_name={last_name}
        headerSwitcher={this.props.headerSwitcher}
      />
    );

    const choose_header = () => {
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
