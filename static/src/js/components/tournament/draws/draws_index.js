import React from 'react';
import * as mobx from 'mobx';
import * as drawStyles from './draws_styles';
import Paper from 'material-ui/Paper';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import { inject, observer } from 'mobx-react/index';

import { Tree, Match, NextMatch } from './draw_body';


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

  render() {
    const { DrawsStore, TournamentStore } = this.props.stores;

    const draw = DrawsStore.draw.length ? mobx.toJS(DrawsStore.draw) : false;

    const categories = TournamentStore.tournamentCategories;

    const StageBar = () => (
      <Paper id={'stageBar'} zDepth={1} style={drawStyles.flexContainerStage}>
        {this.state.prevStage ? (
          <ArrowBack onClick={e => this.arrowForwardClick(e)} />
        ) : (
          false
        )}
        <div
          style={{ ...drawStyles.basicBlockStyle, ...drawStyles.stageStyle }}
        >
          {this.state.currentStage}
        </div>
        <div
          style={{ ...drawStyles.basicBlockStyle, ...drawStyles.stageStyle }}
        >
          {this.state.nextStage}
        </div>
        {!(this.state.nextStage === 'F') ? (
          <ArrowForward onClick={e => this.arrowBackClick(e)} />
        ) : (
          false
        )}
      </Paper>
    );

    let matches = [];
    let nextMatches = [];

    if (draw) {
      if (this.state.currentStage === 'R16') {
        matches = DrawsStore.matchesR16.map(matchQF =>
          Match(matchQF.player1, matchQF.player2));
        nextMatches = DrawsStore.matchesQF.map(matchQF =>
          NextMatch('WINNER A', 'WINNER B', this.state.nextStage));
      } else {
        matches = DrawsStore.matchesSF.map(matchSF =>
          Match('WINNER A', 'WINNER B'));
        nextMatches = DrawsStore.matchesF.map(matchF =>
          NextMatch('WINNER A', 'WINNER B', this.state.nextStage));
      }
    }

    const drawTree = draw ? (
      <div>
        {StageBar(
          this.state.prevStage,
          this.state.currentStage,
          this.state.nextStage,
        )}
        {Tree(matches, nextMatches)}
      </div>
    ) : (
      false
    );

    return (
      <div>
        <div>
          {categories
            ? categories.map((category, index) => (
                <div>
                  <a key={index}>{category.category}</a>

                  <FlatButton
                    label="Generate/ Display Draw"
                    primary={true}
                    onClick={() => {
                      DrawsStore.getCategoryDraw(category.id);
                      this.forceUpdate();
                    }}
                  />
                  <FlatButton
                    label="Delete Draw"
                    primary={true}
                    onClick={() => {
                      DrawsStore.getCategoryDraw(category.id);
                      this.forceUpdate();
                    }}
                  />
                </div>
              ))
            : false}
        </div>

        <div>{drawTree}</div>
      </div>
    );
  }
}
