import React, { Component } from 'react';
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

export default class TournamentsTable extends Component {
  // eslint-disable-next-line
  render() {
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
          <TableRow>
            <TableRowColumn>Shenkar Open 2018</TableRowColumn>
            <TableRowColumn>created</TableRowColumn>
            <TableRowColumn>15-20 Apr 2018</TableRowColumn>
            <TableRowColumn>no</TableRowColumn>
            <TableRowColumn>
              <ModeEdit />
              <DeleteForever />
            </TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Shenkar Open 2018</TableRowColumn>
            <TableRowColumn>created</TableRowColumn>
            <TableRowColumn>15-20 Apr 2018</TableRowColumn>
            <TableRowColumn>no</TableRowColumn>
            <TableRowColumn>actions</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Shenkar Open 2018</TableRowColumn>
            <TableRowColumn>created</TableRowColumn>
            <TableRowColumn>15-20 Apr 2018</TableRowColumn>
            <TableRowColumn>no</TableRowColumn>
            <TableRowColumn>actions</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Shenkar Open 2018</TableRowColumn>
            <TableRowColumn>created</TableRowColumn>
            <TableRowColumn>15-20 Apr 2018</TableRowColumn>
            <TableRowColumn>no</TableRowColumn>
            <TableRowColumn>actions</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
