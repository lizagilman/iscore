import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import MyCheckbox from "./checkbox/myCheckbox";
import { registerCoachPlayerToTournament } from "../../api";
import ReactResponsiveSelect from "react-responsive-select";

const mobx = require("mobx");

const caretIcon = (
  <svg
    className="caret-icon"
    x="1px"
    y="1px"
    width="11.848px"
    height="6.338px"
    viewBox="351.584 2118.292 11.848 6.338"
  >
    <g>
      <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
    </g>
  </svg>
);
const styles = {
  list: {
    listStyleType: "none",
    display: "block",
    margin: "0",
    padding: "0"
  },
  block: {
    maxWidth: 250
  },

  conteinerStyle: {
    height: "100%",
    width: "100%"
  },
  customWidth: {
    width: "100%",
    fontSize: "50px",
    marginBottom: ".5em",
    boxShadow: "5px 10px 18px #888888",
    backgroundColor: "ivory",
    height: "3em"
  },
  menuLabel: {
    width: "100%",
    fontSize: "40px",
    marginTop: "60px",
    marginBottom: "60px",
    height: "100%"
  },
  hintText: {
    bottom: "1.2em"
  },
  button: {
    display: "block",
    margin: "12px",
    height: "30px",
    width: "40px",
    color: "black",
    backgroundColor: "white",
    border: "1px solid black"
  }
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
    width: ${props => (props.span ? props.span / 12 * 100 : "8.33")}%;
  }
`;

@inject("stores")
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
      coach_name: "dani",
      tournaments: [],
      optionsPlayers: [],
      optionsTournaments: [],
      optionsCategories: [],
      tournamentSelected: null,
      categories: [],
      categorySelected: null,
      players: [],
      checkedPlayers: [],
      selectedOptions: [],
      checkboxesofplayers: [],
      refs: [],
      playersSelection: {}
    };
  }

  handleOptionsSubmit(event) {
    let selected = [...this.state.selectedOptions];
    selected.push(event.target.value);
    this.setState({
      selectedOptions: selected
    });
  }
  addRef(node) {
    let myrefs = [...this.state.refs];
    myrefs.push(myRef);
    this.setState({ refs: myrefs });
  }
  componentWillMount() {
    const { TournamentsStore, CoachEnterPlayersStore } = this.props.stores;

    const self = this;
    CoachEnterPlayersStore.fetchPlayers(this.state.coach_name).then(
      storedPlayers => {
        self.setState({ players: mobx.toJS(storedPlayers) });

        console.log("storedPlayers: ", mobx.toJS(storedPlayers));
      }
    );

    TournamentsStore.fetchAllTournaments().then(storedTournaments => {
      self.setState({ tournaments: mobx.toJS(storedTournaments) }, () => {
        this.createTournamentOptions();
      });
    });

    this.createPlayerOptions();
  }
  createTournamentOptions() {
    console.log("crating oprions");
    if (this.state.tournaments) {
      const self = this;
      console.log("createTournamentOptions");
      let tourdoc = [];

      this.state.tournaments.map((tournament, index) =>
        tourdoc.push({ value: tournament.id, text: tournament.name })
      );
      console.log("tournament doc:", tourdoc);
      self.setState({ optionsTournaments: tourdoc });
    }
  }
  createCategoriesOptions() {
    if (this.state.categories) {
      const self = this;
      console.log("in createCategoriesOptions categories");
      let catdoc = [];
      this.state.categories.map((category, index) =>
        catdoc.push({ value: category.id, text: category.category })
      );
      console.log("tournament doc:", catdoc);
      self.setState({ optionsCategories: catdoc });
    }
  }

  createPlayerOptions() {
    if (this.state.players) {
      const self = this;
      console.log("in createPlayerOptions players");
      let playdoc = [];
      this.state.players.map((player, index) =>
        playdoc.push(
          <MyCheckbox
            contentEditable={true}
            ref={instance => {
              this.child = instance;
            }}
            label={player.name}
            value={player.id}
            changed={o => {
              let playersSelection = self.state.playersSelection;
              playersSelection[o.playerId] = o.isChecked;
              self.setState({ playersSelection: playersSelection });
              console.log("coachList ", playersSelection);
            }}
            submit={false}
          />
        )
      );
      console.log("player doc:", playdoc);
      self.setState({ optionsPlayers: playdoc });
    }
  }

  handleChangeTour = value => {
    console.log("in  handleChangeTour value: ", value);
    this.setState({ tournamentSelected: value });
    console.log("handleChangeTour value", value);
    const { CoachEnterPlayersStore } = this.props.stores;
    const self = this;
    CoachEnterPlayersStore.receiveCategoriesByTournament(value).then(
      storedCategories => {
        self.setState({ categories: mobx.toJS(storedCategories) }, () => {
          this.createCategoriesOptions();
        });
      }
    );
  };

  handleChangeCat = value => {
    console.log("in  handleChangeCat value is: ", value);
    this.setState({ categorySelected: value }, () => {
      this.createPlayerOptions();
    });
  };

  buttonClicked = event => {
    let selectedPlayers = [];
    for (var x in this.state.playersSelection) {
      if (this.state.playersSelection[x]) {
        selectedPlayers.push(x);
        this.registerPlayers(x);
      }
    }

    console.log("selected players ", selectedPlayers);
  };
  registerPlayers(player_id) {
    console.log('in registerPlayers category:', this.state.categorySelected);
    const entry = {
      tournament_category: this.state.categorySelected,
      player: player_id
    };

    registerCoachPlayerToTournament(entry);
  }

  render() {
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
                  : ""
              }
              caretIcon={caretIcon}
              prefix="Select tounarment "
              selectedValue={this.state.tournamentSelected}
              onChange={newValue => {
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
                this.state.optionsCategories ? this.state.optionsCategories : ""
              }
              caretIcon={caretIcon}
              prefix="Select category "
              selectedValue={this.state.categorySelected}
              onChange={newValue => {
                this.handleChangeCat(newValue.value);
              }}
            />
          </Column>
        </Row>
        <div style={{ display: "block" }}>
          <ul style={styles.list}>
            {this.state.optionsPlayers ? this.state.optionsPlayers : ""}
          </ul>
        </div>

        <div style={{ display: "block" }}>
          <row>
            <Column span="2">
              <RaisedButton
                label="Submit"
                style={styles.button}
                onClick={() => this.buttonClicked(event)}
              />
            </Column>
          </row>
        </div>
      </div>
    );
  }
}
