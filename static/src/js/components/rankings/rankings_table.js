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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import RankingListForm from './rankings_modal';
import FeedBack from '../feeback_dialog/feeback_modal';

const nameStyle = {
  paddingRight: '100px',
};

@inject('stores')
@observer
export default class RankingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    this.saveNewRankingList = this.saveNewRankingList.bind(this);
    this.deleteRanking = this.deleteRanking.bind(this);

    this.state = {
      displayModal: false,
      displayFeedbackModal: false,
      feedbackText: '',
    };
  }

  openModal() {
    this.setState({ displayModal: true });
  }

  closeModal() {
    this.setState({ displayModal: false });
  }

  closeFeedbackModal(e) {
    e.preventDefault();
    this.setState({ displayFeedbackModal: false });
  }

  saveNewRankingList() {
    this.setState({ displayModal: false, displayFeedbackModal: true });
    const { RankingsStore } = this.props.stores;
    RankingsStore.createNewRankingList().then((feedback) => {
      if (feedback) {
        this.setState({ feedbackText: 'Ranking list created Successfully!' });
      } else {
        this.setState({ feedbackText: 'Failed to create ranking list!' });
      }
    });
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

    RankingsStore.fetchAllRankings(localStorage.organization_id);
  }

  render() {
    const { RankingsStore } = this.props.stores;

    const storedData = RankingsStore.allRankings;

    const data = storedData ? mobx.toJS(storedData) : false;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link
            to={{ pathname: `/ranking/${item.id}`, state: { name: item.name } }}
          >
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

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.closeModal} />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.saveNewRankingList}
      />,
    ];

    const modal = (
      <Dialog
        title="Create Ranking List"
        actions={actions}
        modal={true}
        open={this.state.displayModal}
      >
        <RankingListForm />
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
        {rankingsTable}
        {modal}
        {this.state.displayFeedbackModal ? FeedbackModal : false}
      </div>
    );
  }
}
