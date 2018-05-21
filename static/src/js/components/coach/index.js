import React from 'react';
import ReactResponsiveSelect from 'react-responsive-select';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MyCheckbox from './checkbox/myCheckbox';
import { registerCoachPlayerToTournament } from '../../api';
import { teal500 } from 'material-ui/styles/colors';

const mobx = require('mobx');

const styles = {
  list: {
    listStyleType: 'none',
    display: 'block',
    margin: '0',
    padding: '0',
  },
  block: {
    maxWidth: 250,
  },
  conteinerStyle: {
    height: '100%',
    width: '100%',
  },
  customWidth: {
    width: '100%',
    fontSize: '50px',
    marginBottom: '.5em',
    boxShadow: '5px 10px 18px #888888',
    backgroundColor: 'ivory',
    height: '3em',
  },
  menuLabel: {
    width: '100%',
    fontSize: '40px',
    marginTop: '60px',
    marginBottom: '60px',
    height: '100%',
  },
  hintText: {
    bottom: '1.2em',
  },
  dialogButton: {
    width: '100%',
  },
  dialogButtonLabel: {
    width: '100%',
    fontSize: '3em',
    fontWeight: '600',

    marginBottom: '1em',
  },
  dialog: {
    width: '100%',
    maxWidth: '100%',
  },
  dialogBody: {
    fontSize: '4em',
  },
  button: {
    display: 'block',
    height: '100px',
    width: '100%',
    backgroundColor: 'teal500',
    border: 'solid 1px teal500',
    borderRadius: '8px',
  },
  label: {
    fontSize: '80px',
    textAlign: 'center',
    color: 'white',
    fontWeight: '400',
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
    this.createTournamentOptions = this.createTournamentOptions.bind(this);
    this.createCategoriesOptions = this.createCategoriesOptions.bind(this);
    this.createPlayerOptions = this.createPlayerOptions.bind(this);
    this.handleChangeTour = this.handleChangeTour.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleOptionsSubmit = this.handleOptionsSubmit.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.registerPlayers = this.registerPlayers.bind(this);
    this.state = {
      coach_name: 'dani',
      tournaments: [],
      optionsPlayers: [],
      optionsTournaments: [],
      optionsCategories: [],
      tournamentSelected: null,
      categories: [],
      categorySelected: null,
      players: [],
      selectedOptions: [],
      open: false,
      dialog: '',
      playersSelection: {},
    };
  }

  handleOpen = (str) => {
    this.setState({ open: true, dialog: str });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOptionsSubmit(event) {
    const selected = [...this.state.selectedOptions];
    selected.push(event.target.value);
    this.setState({
      selectedOptions: selected,
    });
  }

  componentWillMount() {
    const { TournamentsStore, CoachEnterPlayersStore } = this.props.stores;

    const self = this;
    CoachEnterPlayersStore.fetchPlayers(this.state.coach_name).then((storedPlayers) => {
      self.setState({ players: mobx.toJS(storedPlayers) });
    });

    TournamentsStore.fetchAllTournaments().then((storedTournaments) => {
      self.setState({ tournaments: mobx.toJS(storedTournaments) }, () => {
        this.createTournamentOptions();
      });
    });

    this.createPlayerOptions();
  }
  createTournamentOptions() {
    if (this.state.tournaments) {
      const self = this;

      const tourdoc = [];

      this.state.tournaments.map((tournament, index) =>
        tourdoc.push({ value: tournament.id, text: tournament.name }));

      self.setState({ optionsTournaments: tourdoc });
    }
  }
  createCategoriesOptions() {
    if (this.state.categories) {
      const self = this;

      const catdoc = [];
      this.state.categories.map((category, index) =>
        catdoc.push({ value: category.id, text: category.category }));

      self.setState({ optionsCategories: catdoc });
    }
  }

  createPlayerOptions() {
    if (this.state.players) {
      const self = this;

      const playdoc = [];
      this.state.players.map((player, index) =>
        playdoc.push(<MyCheckbox
            contentEditable={true}
            ref={(instance) => {
              this.child = instance;
            }}
            label={player.name}
            value={player.id}
            changed={(o) => {
              const playersSelection = self.state.playersSelection;
              playersSelection[o.playerId] = o.isChecked;
              self.setState({ playersSelection });
            }}
            submit={false}
          />));

      self.setState({ optionsPlayers: playdoc });
    }
  }

  handleChangeTour = (value) => {
    this.setState({ tournamentSelected: value });

    const { CoachEnterPlayersStore } = this.props.stores;
    const self = this;
    CoachEnterPlayersStore.receiveCategoriesByTournament(value).then((storedCategories) => {
      self.setState({ categories: mobx.toJS(storedCategories) }, () => {
        this.createCategoriesOptions();
      });
    });
  };

  handleChangeCat = (value) => {
    this.setState({ categorySelected: value }, () => {
      this.createPlayerOptions();
    });
  };

  buttonClicked = (event) => {
    const selectedPlayers = [];
    let res;
    for (const x in this.state.playersSelection) {
      if (this.state.playersSelection[x]) {
        selectedPlayers.push(x);
        res = this.registerPlayers(x);
      }
    }
    if (selectedPlayers.length === 0) {
      return this.handleOpen('No players were selected.');
    }
  };

  registerPlayers(playerId) {
    const entry = {
      tournament_category: this.state.categorySelected,
      player: playerId,
    };

    registerCoachPlayerToTournament(entry).then((response) => {
      if (response.status > 400) {
        this.handleOpen('Error. Check your connection.');
      } else {
        this.handleOpen('Registration has been done successfully.');
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="OK"
        fullWidth={true}
        primary={true}
        onClick={this.handleClose}
        buttonStyle={styles.dialogButton}
        labelStyle={styles.dialogButtonLabel}
      />,
    ];
    return (
      <div style={styles.conteinerStyle}>
        <Row>
          <Column span="12">
            <ReactResponsiveSelect
              style={styles.checkboxDiv}
              name="select tournament"
              options={
                this.state.optionsTournaments
                  ? this.state.optionsTournaments
                  : ''
              }
              // caretIcon={caretIcon}
              prefix="Select tounarment "
              selectedValue={this.state.tournamentSelected}
              onChange={(newValue) => {
                this.handleChangeTour(newValue.value);
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column span="12">
            <ReactResponsiveSelect
              name="select category"
              options={
                this.state.optionsCategories ? this.state.optionsCategories : ''
              }
              // caretIcon={caretIcon}
              prefix="Select category "
              selectedValue={this.state.categorySelected}
              onChange={(newValue) => {
                this.handleChangeCat(newValue.value);
              }}
            />
          </Column>
        </Row>
        <div style={{ display: 'block' }}>
          <ul style={styles.list}>
            {this.state.optionsPlayers ? this.state.optionsPlayers : ''}
          </ul>
        </div>

        <div style={{ display: 'block' }}>
          <Row>
            <Column span="12">
              <RaisedButton
                style={styles.button}
                primary={true}
                label="Submit"
                labelStyle={styles.label}
                // fullWidth={true}
                onClick={() => this.buttonClicked(event)}
              />
            </Column>
          </Row>
          <Row>
            <Column span="12">
              <Dialog
                bodyStyle={styles.dialogBody}
                contentStyle={styles.dialog}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                {this.state.dialog}
              </Dialog>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}
