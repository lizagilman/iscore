/* eslint-disable */
import React from "react";
import { inject, observer } from "mobx-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const mobx = require("mobx");

const entries_table_style_player = {
  paddingLeft: "77px"
};
const entries_table_style_rank = {
  paddingLeft: "60px"
};
const entries_table_style_seed = {
  paddingLeft: "50px"
};
const entries_table = {
  backgroundColor: "white"
};
@inject("stores")
@observer
export default class EntriesAndSeeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    console.log("will mount");
    //const { EntriesStore } = this.props.stores;
    // EntriesStore.fetchAllEntries();
  }

  render() {
    console.log("will render");
    const { EntriesStore } = this.props.stores;
debugger
    const storedEntries = EntriesStore.allEntries;

    //const data = storedEntries && storedEntries.length > 0 ? mobx.toJS(storedEntries)[0] : false;
    const createRow = (item, index) => {
      console.log("will create row");

      return (
        <TableRow key={index}>
          <TableRowColumn style={entries_table_style_player}>
            {item.player}
          </TableRowColumn>
          <TableRowColumn style={entries_table_style_rank}>
            {item.rank}
          </TableRowColumn>
          <TableRowColumn style={entries_table_style_seed}>
            {item.seed}
          </TableRowColumn>
        </TableRow>
      );
    };

    const entriesTable = (
      <div>
        <Table style={entries_table}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>Seed</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {console.log("schedule table")}
            {storedEntries
              ? storedEntries.map((Entrie, index) => createRow(Entrie, index))
              : "Loading..."}
          </TableBody>
        </Table>
      </div>
    );

    return <div>{entriesTable}</div>;
  }
}
