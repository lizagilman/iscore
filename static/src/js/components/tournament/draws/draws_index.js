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

          matches = DrawsStore.matchesR16.map((matchR16, index) => {
            let style1 = true;

            switch (index) {
              case 2:
              case 3:
              case 6:
              case 7:
                style1 = false;
            }

            return Match(
              matchR16.player1,
              matchR16.player2,
              matchR16.winner,
              style1,
              matchR16.id,
              matchR16.score_set[0],
            );
          });

          nextMatches = DrawsStore.matchesQF.map((matchQF, index) => {
            const style1 = !(index % 2);

            return NextMatch(
              matchQF.player1
                ? matchQF.player1
                : `Winner of 1st Round ${++nextMatchCounter}`,
              matchQF.player2
                ? matchQF.player2
                : `Winner of 1st Round ${++nextMatchCounter}`,
              matchQF.winner,
              this.state.nextStage,
              matchQF.match_index,
              style1,
              matchQF.id,
              matchQF.score_set[0],
            );
          });

          break;

        case QF:
          // draw QF and SF
          nextMatchCounter = 0;

          matches = DrawsStore.matchesQF.map((matchQF, index) => {
            let style1 = true;

            switch (index) {
              case 2:
              case 3:
                style1 = false;
            }

            return Match(
              matchQF.player1
                ? matchQF.player1
                : `Winner of 1st Round ${++nextMatchCounter}`,
              matchQF.player2
                ? matchQF.player2
                : `Winner of 1st Round ${++nextMatchCounter}`,
              matchQF.winner,
              style1,
              matchQF.id,
              matchQF.score_set[0],
            );
          });

          nextMatchCounter = 0;

          nextMatches = DrawsStore.matchesSF.map((matchSF, index) => {
            const style1 = !(index % 2);

            return NextMatch(
              matchSF.player1
                ? matchSF.player1
                : `Winner of QF ${++nextMatchCounter}`,
              matchSF.player2
                ? matchSF.player2
                : `Winner of QF ${++nextMatchCounter}`,
              matchSF.winner,
              this.state.nextStage,
              matchSF.match_index,
              style1,
              matchSF.id,
              matchSF.score_set[0],
            );
          });

          break;

        case SF:
          // draw SF and F

          nextMatchCounter = 0;

          matches = DrawsStore.matchesSF.map(matchSF =>
            Match(
              matchSF.player1
                ? matchSF.player1
                : `Winner of QF ${++nextMatchCounter}`,
              matchSF.player2
                ? matchSF.player2
                : `Winner of QF ${++nextMatchCounter}`,
              matchSF.winner,
              false,
              matchSF.id,
              matchSF.score_set[0],
            ));

          nextMatchCounter = 0;

          nextMatches = DrawsStore.matchesF.map(matchF =>
            NextMatch(
              matchF.player1
                ? matchF.player1
                : `Winner of SF ${++nextMatchCounter}`,
              matchF.player2
                ? matchF.player2
                : `Winner of SF ${++nextMatchCounter}`,
              matchF.winner,
              this.state.nextStage,
              matchF.match_index,
              false,
              matchF.id,
              matchF.score_set[0],
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
                    label="Generate Draw"
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
