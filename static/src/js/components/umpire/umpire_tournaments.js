import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react/index';
import * as mobx from 'mobx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Spinner from '../spinner/spinner';
import MainCard from '../main_card/main_card_index';

const nameStyle = {
  paddingRight: '100px',
};
const dateFormat = require('dateformat');

@inject('stores')
@observer
export default class UmpireTournaments extends React.Component {
  constructor(props) {
    super(props);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.setDateTime = this.setDateTime.bind(this);

    this.state = {
      displayModal: false,
    };
  }

  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date);
    return formateDate;
  }

  onLinkClick(id, e) {
    const { UmpireStore } = this.props.stores;

    const selectedTournament = UmpireStore.getSingleTournament(id);
    UmpireStore.setCurrentTournament(selectedTournament);
  }

  componentWillMount() {
    const { UmpireStore } = this.props.stores;

    UmpireStore.fetchAllTournaments();
  }

  render() {
    const { UmpireStore } = this.props.stores;

    const storedData = UmpireStore.allTournaments;

    const data = storedData ? mobx.toJS(storedData) : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link
            to={{
              pathname: `/umpire/tournament/${item.id}/matches`,
              state: { tournamentName: item.name },
            }}
          >
            <div style={nameStyle} onClick={e => this.onLinkClick(item.id, e)}>
              {item.name}
            </div>
          </Link>
        </TableRowColumn>
        <TableRowColumn>{item.field_of_sport}</TableRowColumn>
        <TableRowColumn>{item.status}</TableRowColumn>
        <TableRowColumn>{this.setDateTime(item.start_date)}</TableRowColumn>
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
      </div>
    );

    return (
      <div>
        <MainCard
          title={'Tournaments'}
          content={tournamentsTable}
          style={{ flex: 1, margin: '1vw 2vw 0 2vw' }}
        />
      </div>
    );
  }
}
