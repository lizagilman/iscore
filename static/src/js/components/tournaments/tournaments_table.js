import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('stores')
@observer
export default class TournamentsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournamentsData: [],
    };
  }

  componentWillMount() {
    this.setState({
      tournamentsData: this.props.stores.TournamentsStore.allTournaments.toJS(),
    });
  }

  render() {
    const createRow = (item, index) => (
        <TableRow key={index}>
          <TableRowColumn>{item.tournament_name}</TableRowColumn>
          <TableRowColumn>{item.status}</TableRowColumn>
          <TableRowColumn>{item.dates}</TableRowColumn>
          <TableRowColumn>{item.isPublished ? 'yes' : 'no'}</TableRowColumn>
          <TableRowColumn>
            <ModeEdit />
            <DeleteForever />
          </TableRowColumn>
        </TableRow>
    );

    return (
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
          {this.state.tournamentsData
            ? this.state.tournamentsData.map((tournament, index) =>
                createRow(tournament, index))
            : 'Loading...'}
        </TableBody>
      </Table>
    );
  }
}
