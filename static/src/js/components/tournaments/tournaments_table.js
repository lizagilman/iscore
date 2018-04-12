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

@inject('stores')
@observer
export default class TournamentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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

  componentWillMount() {
    const { TournamentsStore } = this.props.stores;

    TournamentsStore.fetchAllTournaments();
  }

  render() {
    const { TournamentsStore } = this.props.stores;

    const storedData = TournamentsStore.allTournaments.toJS();

    const data = storedData ? storedData[0] : null;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`tournament/${item.id}`}>{item.name} </Link>
        </TableRowColumn>
        <TableRowColumn>{item.status}</TableRowColumn>
        <TableRowColumn>{item.start_date}</TableRowColumn>
        <TableRowColumn>
          <Toggle
            defaultToggled={item.is_published}
            onToggle={e => TournamentsStore.setTournament()}
          />
        </TableRowColumn>
        <TableRowColumn>
          <ModeEdit />
          <DeleteForever />
        </TableRowColumn>
      </TableRow>
    );

    return (
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
  }
}
