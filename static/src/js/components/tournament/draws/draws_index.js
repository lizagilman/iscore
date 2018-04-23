import React from 'react';
import Paper from 'material-ui/Paper';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { inject, observer } from 'mobx-react/index';
import * as drawStyles from './draws_styles';

const mobx = require('mobx');

@inject('stores')
@observer
export default class Draws extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prevStage: null, currentStage: 'R16', nextStage: 'QF' };
    this.arrowForwardClick = this.arrowForwardClick.bind(this);
    this.arrowBackClick = this.arrowBackClick.bind(this);
  }

  arrowForwardClick(e) {
    e.preventDefault();
    if (this.state.prevStage) {
      this.setState({ prevStage: null, currentStage: 'R16', nextStage: 'QF' });
    }
  }

  arrowBackClick(e) {
    e.preventDefault();
    if (!(this.state.nextStage === 'F')) {
      this.setState({ prevStage: 'QF', currentStage: 'SF', nextStage: 'F' });
    }
  }

  componentWillMount() {
    const { DrawsStore } = this.props.stores;

    DrawsStore.getDraw();
  }

  render() {
    const { DrawsStore } = this.props.stores;

    const draw = DrawsStore.draw ? mobx.toJS(DrawsStore.draw) : false;

    const stageBar = (stage, nextStage) => (
      <Paper id={'stageBar'} zDepth={1} style={drawStyles.flexContainerStage}>
        {this.state.prevStage ? (
          <ArrowBack onClick={e => this.arrowForwardClick(e)} />
        ) : (
          false
        )}
        <div
          style={{ ...drawStyles.basicBlockStyle, ...drawStyles.stageStyle }}
        >
          {stage}
        </div>
        <div
          style={{ ...drawStyles.basicBlockStyle, ...drawStyles.stageStyle }}
        >
          {nextStage}
        </div>
        {!(this.state.nextStage === 'F') ? (
          <ArrowForward onClick={e => this.arrowBackClick(e)} />
        ) : (
          false
        )}
      </Paper>
    );

    const tree = (matches, nextMatches) => (
      <div id={'treeContainer'} style={drawStyles.treeContainerStyle}>
        <div style={{ flexGrow: '2' }}>{matches}</div>
        <div style={{ flexGrow: '2' }}>{nextMatches}</div>
      </div>
    );

    const match = (num1, num2) => (
      <Paper zDepth={1} style={drawStyles.flexContainerMatch}>
        <div
          style={{
            ...drawStyles.basicBlockStyle,
            ...drawStyles.stageStyle,
            ...drawStyles.matchStyle,
          }}
        >
          {num1}
        </div>
        <div
          style={{
            ...drawStyles.basicBlockStyle,
            ...drawStyles.stageStyle,
            ...drawStyles.matchStyle,
          }}
        >
          {num2}
        </div>
      </Paper>
    );

    const nextMatch = (num1, num2) => (
      <Paper
        zDepth={1}
        style={{
          ...drawStyles.flexContainerMatch,
          ...drawStyles.flexContainerNextMatch,
        }}
      >
        <div
          style={{
            ...drawStyles.basicBlockStyle,
            ...drawStyles.nextMatchStyle,
          }}
        >
          {num1}
        </div>
        <div
          style={{
            ...drawStyles.basicBlockStyle,
            ...drawStyles.nextMatchStyle,
          }}
        >
          {num2}
        </div>
      </Paper>
    );

    let matches = [];
    let nextMatches = [];

    if (draw) {
      if (this.state.currentStage === 'R16') {
        matches = DrawsStore.matchesR16.map(matchQF =>
          match(matchQF.player1, matchQF.player2));
        nextMatches = DrawsStore.matchesQF.map(matchQF =>
          nextMatch('WINNER A', 'WINNER B'));
      } else {
        matches = DrawsStore.matchesSF.map(matchSF =>
          match('WINNER A', 'WINNER B'));
        nextMatches = DrawsStore.matchesF.map(matchF =>
          nextMatch('WINNER A', 'WINNER B'));
      }
    }

    return (
      <div>
        {stageBar(this.state.currentStage, this.state.nextStage)}
        {tree(matches, nextMatches)}
      </div>
    );
  }
}
