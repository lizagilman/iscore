import React from 'react';
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
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Wizard from './wizard/wizard_index';

const mobx = require('mobx');

@inject('stores')
@observer
export default class TournamentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);

    this.state = {
      displayModal: false,
    };
  }

  openModal() {
    this.setState({ displayModal: true });
  }

  closeModal() {
    this.setState({ displayModal: false });
  }

  toggleHandler(e, tournament) {
    e.preventDefault();

    const { TournamentsStore } = this.props.stores;

    const updatedTournament = Object.assign(tournament, {
      is_published: !tournament.is_published,
    });

    TournamentsStore.updateTournament(updatedTournament);
  }

  onLinkClick(tournament) {
    const { TournamentStore } = this.props.stores;
    TournamentStore.setCurrentTournament(tournament);
  }

  componentWillMount() {
    const { TournamentsStore } = this.props.stores;

    TournamentsStore.fetchAllTournaments();
  }

  render() {
    const { TournamentsStore } = this.props.stores;

    const storedData = TournamentsStore.allTournaments;

    const data = storedData ? mobx.toJS(storedData) : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`tournament/${item.id}`}>
            <div onClick={this.onLinkClick(item)}>{item.name}</div>
          </Link>
        </TableRowColumn>
        <TableRowColumn>{item.status}</TableRowColumn>
        <TableRowColumn>{item.start_date}</TableRowColumn>
        <TableRowColumn>
          <Toggle
            defaultToggled={item.is_published}
            onToggle={e => this.toggleHandler(e, item)}
          />
        </TableRowColumn>
        <TableRowColumn>
          <ModeEdit />
          <DeleteForever />
        </TableRowColumn>
      </TableRow>
    );

    const tournamentsTable = (
      <div>
        <Table style={{ backgroundColor: '#ffffff' }}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Dates</TableHeaderColumn>
              <TableHeaderColumn>Published</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data
              ? data.map((tournament, index) => createRow(tournament, index))
              : 'Loading...'}
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
        disabled={true}
        onClick={this.closeModal}
      />,
    ];

    const modal = (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={true}
        open={this.state.displayModal}
      >
        <Wizard />
      </Dialog>
    );

    return (
      <div>
        {tournamentsTable}
        {modal}
      </div>
    );
  }
}
