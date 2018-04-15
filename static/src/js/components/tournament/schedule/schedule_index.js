import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import Wizard from './wizard/wizard_index';

@inject('stores')
@observer
export default class Schedule extends React.Component {
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
    console.log('will mount');
    const { MatchesStore } = this.props.stores;

    MatchesStore.fetchAllMatchs();
  }

  render() {


    const { MatchesStore } = this.props.stores;


    const storedMatches = MatchesStore.allTournaments.toJS();

    const data = storedMatches ? storedMatches[0] : null;

    const createRow = (item, index) => (
      <TableRow key={index}>
        <TableRowColumn>
          <Link to={`match/${item.id}`}>{item.stage} </Link>
        </TableRowColumn>
        <TableRowColumn>{item.player1}</TableRowColumn>
        <TableRowColumn>{item.player2}</TableRowColumn>
          <TableRowColumn>{item.time}</TableRowColumn>

      </TableRow>
    );

    const scheduleTable = (
      <div>
        <Table style={{ backgroundColor: '#ffffff' }}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Stage</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Player</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {data
              ? data.map((Match, index) => createRow(Match, index))
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

    // const modal = (
    //   <Dialog
    //     title="Dialog With Actions"
    //     actions={actions}
    //     modal={true}
    //     open={this.state.displayModal}
    //   >
    //     <Wizard />
    //   </Dialog>
    // );

    return (
      <div>
        {scheduleTable}
        {/*{modal}*/}
      </div>
    );
  }
}
