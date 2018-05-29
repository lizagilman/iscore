import React from 'react';
import * as mobx from 'mobx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';

const nameStyle = {
  paddingRight: '100px',
};

@inject('stores')
@observer
export default class RankingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.deleteRanking = this.deleteRanking.bind(this);

    this.state = {};
  }

  openModal(e) {
    e.preventDefault();
    // TO-DO: implement create new ranking list ui
  }

  deleteRanking(e, id) {
    e.preventDefault();
    const { RankingsStore } = this.props.stores;
    if (RankingsStore) {
      RankingsStore.deleteRanking(id);
    }
  }

  componentWillMount() {
    const { RankingsStore } = this.props.stores;

    RankingsStore.fetchAllRankings();
  }

  render() {
    const { RankingsStore } = this.props.stores;

    const storedData = RankingsStore.allRankings;

    const data = storedData ? mobx.toJS(storedData) : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`/ranking/${item.id}`}>
            <div style={nameStyle}>{item.name}</div>
          </Link>
        </TableRowColumn>
        <TableRowColumn>{item.field_of_sport || 'Tennis'}</TableRowColumn>
        <TableRowColumn>{item.updated_at || '28/05/18'}</TableRowColumn>
        <TableRowColumn>
          <a href={'#'} onClick={e => this.deleteRanking(e, item.id)}>
            <DeleteForever />
          </a>
        </TableRowColumn>
      </TableRow>
    );

    const rankingsTable = (
      <div>
        <Table style={{ backgroundColor: '#ffffff' }}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Field Of Sport</TableHeaderColumn>
              <TableHeaderColumn>Updated at</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data.length ? (
              data.map((ranking, index) => createRow(ranking, index))
            ) : (
              <div>{Spinner(70)}</div>
            )}
          </TableBody>
        </Table>
        <FloatingActionButton onClick={e => this.openModal(e)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );

    return <div>{rankingsTable}</div>;
  }
}
