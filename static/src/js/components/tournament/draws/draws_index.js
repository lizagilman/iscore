import React from 'react';
import * as mobx from 'mobx';
import { inject, observer } from 'mobx-react/index';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { teal500 } from 'material-ui/styles/colors';
import { Tree, Match, NextMatch, R16, QF, SF, F, stages } from './draw_body';
import Spinner from '../../spinner/spinner';

@inject('stores')
@observer
export default class Draws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevStage: null,
      currentStage: R16,
      nextStage: QF,
      isLoading: false,
    };
    this.arrowForwardClick = this.arrowForwardClick.bind(this);
    this.arrowBackClick = this.arrowBackClick.bind(this);
  }

  arrowBackClick(e) {
    e.preventDefault();

    const currentStageIndex = stages.findIndex(stage => stage === this.state.currentStage);

    if (currentStageIndex > -1) {
      this.setState({
        prevStage: stages[currentStageIndex - 2],
        currentStage: stages[currentStageIndex - 1],
        nextStage: stages[currentStageIndex],
      });
    }
  }

  arrowForwardClick(e) {
    e.preventDefault();

    const currentStageIndex = stages.findIndex(stage => stage === this.state.currentStage);

    if (currentStageIndex > -1) {
      this.setState({
        prevStage: stages[currentStageIndex],
        currentStage: stages[currentStageIndex + 1],
        nextStage: stages[currentStageIndex + 2],
      });
    }
  }

  componentWillMount() {
    const { TournamentStore } = this.props.stores;

    if (!TournamentStore.tournamentCategories.length) {
      TournamentStore.getCategories(this.props.tournamentId || parseInt(this.props.match.params.id, 10));
    }
  }

  render() {
    const { DrawsStore, TournamentStore } = this.props.stores;

    const draw = DrawsStore.draw.length ? mobx.toJS(DrawsStore.draw) : false;

    const categories = TournamentStore.tournamentCategories;

    const StageBar = () => (
      <Paper id={'stageBar'} zDepth={1}>
        {this.state.prevStage ? (
          <div id={'leftArrow'} className={'arrow'} title={'Previous Stage'}>
            <FontIcon
              className="material-icons"
              onClick={e => this.arrowBackClick(e)}
              style={{ fontSize: '50px', fontWeight: 'bold', color: teal500 }}
            >
              arrow_back
            </FontIcon>
          </div>
        ) : (
          false
        )}
        <div className={'stage currentStage'}>{this.state.currentStage}</div>
        <div className={'stage nextStage'}>{this.state.nextStage}</div>
        {!(this.state.nextStage === F) ? (
          <div id={'rightArrow'} className={'arrow'} title={'Next Stage'}>
            <FontIcon
              className="material-icons"
              onClick={e => this.arrowForwardClick(e)}
              style={{ fontSize: '50px', fontWeight: 'bold', color: teal500 }}
            >
              arrow_forward
            </FontIcon>
          </div>
        ) : (
          false
        )}
      </Paper>
    );

    let matches = [];
    let nextMatches = [];

    if (draw) {
      let nextMatchCounter = 0;

      switch (this.state.currentStage) {
        case R16:
          // draw R16 and QF
          matches = DrawsStore.matchesR16.map(matchR16 =>
            Match(matchR16.player1, matchR16.player2, matchR16.winner));
          nextMatches = DrawsStore.matchesQF.map(matchQF =>
            NextMatch(
              matchQF.player1
                ? matchQF.player1
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.player2
                ? matchQF.player2
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.winner,
              this.state.nextStage,
              matchQF.match_index,
            ));

          break;

        case QF:
          // draw QF and SF
          matches = DrawsStore.matchesQF.map(matchR16 =>
            Match(matchR16.player1, matchR16.player2, matchR16.winner));
          nextMatches = DrawsStore.matchesSF.map(matchQF =>
            NextMatch(
              matchQF.player1
                ? matchQF.player1
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.player2
                ? matchQF.player2
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.winner,
              this.state.nextStage,
              matchQF.match_index,
            ));

          break;

        case SF:
          // draw QF and SF

          matches = DrawsStore.matchesSF.map(matchR16 =>
            Match(matchR16.player1, matchR16.player2, matchR16.winner));
          nextMatches = DrawsStore.matchesF.map(matchQF =>
            NextMatch(
              matchQF.player1
                ? matchQF.player1
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.player2
                ? matchQF.player2
                : `Winner of R16 ${++nextMatchCounter}`,
              matchQF.winner,
              this.state.nextStage,
              matchQF.match_index,
            ));

          break;

        default:
        // draw R16
      }
    }

    const drawTree = draw ? (
      <div>
        <div>
          {StageBar(
            this.state.prevStage,
            this.state.currentStage,
            this.state.nextStage,
          )}
        </div>
        <div>{Tree(matches, nextMatches)}</div>
      </div>
    ) : (
      <div>{this.state.isLoading ? Spinner(70) : false}</div>
    );

    return (
      <div>
        <div className={'drawCategories'}>
          {categories
            ? categories.map((category, index) => (
                <div>
                  <a key={index}>{category.category}</a>

                  <FlatButton
                    label="Display Draw"
                    primary={true}
                    onClick={() => {
                      this.setState({ isLoading: true });
                      DrawsStore.getCategoryDraw(category.id);
                      this.forceUpdate();
                    }}
                  />
                  <FlatButton
                    label="Delete Draw"
                    primary={true}
                    onClick={() => {
                      DrawsStore.deleteDraw(category.id);
                      this.forceUpdate();
                    }}
                  />
                </div>
              ))
            : Spinner(40)}
        </div>

        <div>{drawTree}</div>
      </div>
    );
  }
}
