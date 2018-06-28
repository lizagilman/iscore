import React from 'react';
import * as mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Wizard from './wizard/wizard_index';
import Spinner from '../spinner/spinner';
import FeedBack from '../feeback_dialog/feeback_modal';

const nameStyle = {
  paddingRight: '100px',
};

const dateFormat = require('dateformat');

@inject('stores')
@observer
export default class TournamentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.deleteTournament = this.deleteTournament.bind(this);
    this.saveNewTournament = this.saveNewTournament.bind(this);
    this.setDateTime = this.setDateTime.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);

    this.state = {
      displayModal: false,
      displayFeedbackModal: false,
      feedbackText: '',
      statuses: {},
    };
  }
  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date);
    return formateDate;
  }

  openModal() {
    this.setState({ displayModal: true });
  }

  closeModal() {
    this.setState({ displayModal: false });
  }

  saveNewTournament() {
    this.setState({ displayModal: false, displayFeedbackModal: true });
    const { WizardStore, TournamentsStore } = this.props.stores;
    WizardStore.createNewTournament().then((response) => {
      if (response) {
        this.setState({ feedbackText: 'Tournament created Successfully!' });
        TournamentsStore.addCreatedTournament(response);
      } else {
        this.setState({ feedbackText: 'Failed to create tournament!' });
      }
    });
  }

  toggleHandler(e, tournament) {
    e.preventDefault();
    const { TournamentsStore } = this.props.stores;

    // eslint-disable-next-line
    const updatedTournament = (({ id, name, field_of_sport }) => ({
      id,
      name,
      field_of_sport,
    }))(tournament);
    updatedTournament.is_published = !tournament.is_published;
    TournamentsStore.updateTournament(updatedTournament);
  }

  onLinkClick(id) {
    const { TournamentsStore, TournamentStore } = this.props.stores;

    const selectedTournament = TournamentsStore.getSingleTournament(id);
    TournamentStore.setCurrentTournament(selectedTournament);
  }

  deleteTournament(e, id) {
    e.preventDefault();
    const { TournamentStore } = this.props.stores;
    if (TournamentStore) {
      TournamentStore.deleteTournament(id);
    }
  }

  handleStatusChange(e, index, value, tournament) {
    e.preventDefault();

    const statuses = this.state.statuses;
    const oldStatus = statuses;

    statuses[tournament.id] = value;
    this.setState(statuses);

    const { TournamentsStore } = this.props.stores;

    // eslint-disable-next-line
    const updatedTournament = (({ id, name, field_of_sport }) => ({
      id,
      name,
      field_of_sport,
    }))(tournament);
    updatedTournament.status = value;
    TournamentsStore.updateTournament(updatedTournament).then((feedback) => {
      if (!feedback) {
        this.setState({
          displayFeedbackModal: true,
          feedbackText: 'Status update failed!',
        });
        this.setState(oldStatus);
      }
    });
  }

  closeFeedbackModal(e) {
    e.preventDefault();
    this.setState({ displayFeedbackModal: false, feedbackText: '' });
  }

  componentWillMount() {
    const statuses = {};

    const { TournamentsStore } = this.props.stores;
    TournamentsStore.fetchAllTournaments().then((tournaments) => {
      tournaments.forEach(tournament => (statuses[tournament.id] = tournament.status));

      this.setState({ statuses });
    });
  }

  render() {
    const { TournamentsStore } = this.props.stores;

    const storedData = TournamentsStore.allTournaments;

    const data = storedData ? mobx.toJS(storedData) : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link
            to={{
              pathname: `/tournament/${item.id}`,
              state: { tournamentName: item.name },
            }}
          >
            <div style={nameStyle} onClick={() => this.onLinkClick(item.id)}>
              {item.name}
            </div>
          </Link>
        </TableRowColumn>
        <TableRowColumn>{item.field_of_sport}</TableRowColumn>
        <TableRowColumn>
          <SelectField
            value={this.state.statuses[item.id] || item.status}
            onChange={(event, index, value) =>
              this.handleStatusChange(event, index, value, item)
            }
          >
            <MenuItem key={1} value={'Created'} primaryText={'Created'} />
            <MenuItem
              key={2}
              value={'Open for Registration'}
              primaryText="Open for Registration"
            />
            <MenuItem
              key={3}
              value={'Registration Closed'}
              primaryText="Registration Closed"
            />
            <MenuItem
              key={4}
              value={'Schedule Published'}
              primaryText="Schedule Published"
            />
            <MenuItem key={5} value={'Finished'} primaryText="Finished" />
          </SelectField>
        </TableRowColumn>
        <TableRowColumn>{this.setDateTime(item.start_date)}</TableRowColumn>
        <TableRowColumn>
          <Toggle
            defaultToggled={item.is_published}
            onToggle={e => this.toggleHandler(e, item)}
          />
        </TableRowColumn>
        <TableRowColumn>
          <a href={'#'} onClick={e => this.deleteTournament(e, item.id)}>
            <DeleteForever />
          </a>
        </TableRowColumn>
      </TableRow>
    );
    const tournamentsTable = (
      <div>
        <Table style={{ backgroundColor: '#ffffff' }}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Field Of Sport</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Dates</TableHeaderColumn>
              <TableHeaderColumn>Published</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data.length ? (
              data.map((tournament, index) => createRow(tournament, index))
            ) : (
              <div>{Spinner(70)}</div>
            )}
          </TableBody>
        </Table>
        <FloatingActionButton onClick={e => this.openModal()}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.closeModal} />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.saveNewTournament}
      />,
    ];

    const modal = (
      <Dialog
        title="Create Tournament"
        actions={actions}
        modal={true}
        open={this.state.displayModal}
      >
        <Wizard />
      </Dialog>
    );

    const FeedbackModal = (
      <FeedBack
        text={this.state.feedbackText}
        handleClose={this.closeFeedbackModal}
      />
    );

    return (
      <div>
        <div>{this.props.children}</div>
        {tournamentsTable}
        {modal}
        {this.state.displayFeedbackModal ? FeedbackModal : false}
      </div>
    );
  }
}
