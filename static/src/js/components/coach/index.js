/* eslint-disable */
import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { registerCoachPlayerToTournament } from '../../api';
import CoachHeader from './header/header';


const mobx = require('mobx');

const styles = {
  customWidth: {
    width: '100%',
    fontSize: '50px',
    marginBottom: '.5em',
    boxShadow: '5px 10px 18px #888888',
    backgroundColor: 'lavenderblush',
    height: '3em',
  },
  menuLabel: {
    width: '100%',
    fontSize: '40px',
    marginTop: '60px',
    marginBottom: '60px',
  },
  hintText: {
    bottom: '1.2em',
  },
};
const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
const Column = styled.div`
  float: left;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: ${props => (props.span ? props.span / 12 * 100 : '8.33')}%;
  }
`;

@inject('stores')
@observer
export default class CoachPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coach_name: 'dani',
      tournaments: [],
      tournamentSelected: null,
      categories: [],
      categorySelected: null,
      players: [],
      playersChecked: [],
    };
  }
  componentWillMount() {
    localStorage.setItem('user_type', 'coach');
    const { TournamentsStore } = this.props.stores;
    const self = this;
    TournamentsStore.fetchAllTournaments().then((storedTournaments) => {
      self.setState({ tournaments: mobx.toJS(storedTournaments) });
    });
  }
  createMenuItemTournament() {
    return this.state.tournaments
      ? this.state.tournaments.map((tournament, index) => (
          <MenuItem
            key={index}
            primaryText={tournament.name}
            style={styles.menuLabel}
            value={tournament.id}
          />
      ))
      : '';
  }
  createMenuItemCategory() {
    return this.state.categories
      ? this.state.categories.map((category, index) => (
          <MenuItem
            key={index}
            primaryText={category.category}
            style={styles.menuLabel}
            value={category.id}
          />
      ))
      : '';
  }
  createMenuItemsPlayers(values) {
    return this.state.players.map(player => (
      <MenuItem
        style={styles.menuLabel}
        key={player.name}
        insetChildren={true}
        checked={values && values.indexOf(player.name) > -1}
        value={player.id}
        primaryText={player.name}
      />
    ));
  }
  handleChangeTour = (event, index, value) => {
    this.setState({ tournamentSelected: value });
    console.log('handleChangeTour value', value);
    const { CategoryStore } = this.props.stores;
    const self = this;
    CategoryStore.CategoriesByTournament(value).then((storedCategories) => {
      self.setState({ categories: mobx.toJS(storedCategories) });
    });
  };
  handleChangeCat = (event, index, value) => {
    this.setState({ categorySelected: value });
    console.log('categorySelected: ', value);

    const { CoachEnterPlayersStore } = this.props.stores;
    const self = this;
    CoachEnterPlayersStore.fetchPlayers(this.state.coach_name).then((storedPlayers) => {
      self.setState({ players: mobx.toJS(storedPlayers) });
    });
  };
  handleChangePlayers = (event, index, values) => {
    const selectedPlayer = [...this.state.playersChecked];
    selectedPlayer.push(values);
    this.setState({ playersChecked: selectedPlayer });

    const categoryId = this.state.categorySelected
      ? this.state.categorySelected
      : false;
    console.log('playersChecked value[0]: ', values[0]);
    categoryId ? this.registerPlayers(categoryId, values[0]) : '';

    console.log('playersChecked value: ', values);
    console.log('playersChecked state: ', this.state.playersChecked);
  };
  registerPlayers=(catId, player) => {
    const entry = {
      tournament_category: catId,
      player,
    };
    registerCoachPlayerToTournament(entry);
  };
  render() {
    const { values } = this.state;
    return (
      <div>
        <Row>
          <Column span="12">
            {/*<CoachHeader />*/}
          </Column>
        </Row>
        <Row>
          <Column span="12">
            <SelectField
              hintText="Select tournament"
              value={this.state.tournamentSelected}
              onChange={(event, index, value) =>
                this.handleChangeTour(event, index, value)
              }
              style={styles.customWidth}
            >
              {this.createMenuItemTournament()}
            </SelectField>
          </Column>
        </Row>

        <Row>
          <Column span="12">
            <SelectField
              hintText="Select category"
              value={this.state.categorySelected}
              onChange={(event, index, value) =>
                this.handleChangeCat(event, index, value)
              }
              style={styles.customWidth}
            >
              {this.createMenuItemCategory()}
            </SelectField>
          </Column>
        </Row>

        <Row>
          <Column span="12">
            <SelectField
              hintText="Select players"
              value={values}
              onChange={(event, index, value) =>
                this.handleChangePlayers(event, index, value)
              }
              multiple={true}
              style={styles.customWidth}
            >
              {this.createMenuItemsPlayers(values)}
            </SelectField>
          </Column>
        </Row>
      </div>
    );
  }
}
