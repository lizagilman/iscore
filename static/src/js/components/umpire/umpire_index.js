import React from 'react';
import { inject, observer } from 'mobx-react/index';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import MainCard from '../main_card/main_card_index';
import * as LiveScore from './liveScore_consts';
import { getPlayerIdByPlayerName, updateMatchWinnerApi } from '../../api';
import FeedBack from '../feeback_dialog/feeback_modal';

const mobx = require('mobx');

@inject('stores')
@observer
class LiveMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDisabled: false,
      serving: false,
      score: {
        current_set: 1,
        current_game: 1,
        p1_set1: 0,
        p2_set1: 0,
        p1_set2: 0,
        p2_set2: 0,
        p1_set3: 0,
        p2_set3: 0,
        p1_set4: 0,
        p1_set5: 0,
        p2_set5: 0,
        p1_sets: 0,
        p2_sets: 0,
        p1_games: 0,
        p2_games: 0,
        p1_points: 0,
        p2_points: 0,
        match_id: null,
        serving: LiveScore.PLAYER_1,
        winner: null,
        displayFeedbackModal: false,
        feedbackText: '',
      },
    };

    this.socket = null;

    this.toggleServing = this.toggleServing.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.startMatch = this.startMatch.bind(this);
    this.updateLiveScore = this.updateLiveScore.bind(this);
    this.updateWinner = this.updateWinner.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
  }

  toggleServing = () => {
    const serving = this.state.score.serving;
    const newScore = this.state.score;
    newScore.serving =
      serving === LiveScore.PLAYER_1 ? LiveScore.PLAYER_2 : LiveScore.PLAYER_1;
    this.setState({ score: newScore });
    this.updateLiveScore(newScore)
  };

  startMatch = () => {
    this.setState({ startDisabled: true });
  };

  update_state = (data) => {
    this.setState(data);
  };

  componentWillMount() {
    const self = this;

    const { UmpireStore } = this.props.stores;

    const match = mobx.toJS(UmpireStore.getSingleMatch());

    getPlayerIdByPlayerName(match.player1).then((response) => {
      LiveScore.PLAYER_1 = response[0].id;
    });

    getPlayerIdByPlayerName(match.player2).then((response) => {
      LiveScore.PLAYER_2 = response[0].id;
    });

    this.setState({ match_id: match.id });
    this.setState({ score: { ...this.state.score, match_id: match.id } });

    console.log('gonna create new websocket');

    this.socket = new WebSocket(`wss://iscore-app.herokuapp.com/ws/iscore/match/${match.id}/`);

    // recieve

    this.socket.onmessage = function (event, that = self) {
      const score = JSON.parse(event.data).message;

      that.update_state({ score });
    };
  }

  updateLiveScore(newScore) {
    this.socket.send(JSON.stringify(newScore));
  }

  updateScore = (player, current_points, operation) => {
    let newPoints = null;
    let endOfGame = null;

    switch (current_points) {
      case 0: {
        newPoints = operation === LiveScore.ADD ? 15 : 0;
        break;
      }
      case 15: {
        newPoints = operation === LiveScore.ADD ? 30 : 0;
        break;
      }
      case 30: {
        newPoints = operation === LiveScore.ADD ? 40 : 15;
        break;
      }
      case 40: {
        // 40 : 15

        if (
          (this.state.score.p1_points > this.state.score.p2_points ||
            this.state.score.p1_points < this.state.score.p2_points) &&
          (this.state.score.p1_points !== LiveScore.ADVANTAGE &&
            this.state.score.p2_points !== LiveScore.ADVANTAGE)
        ) {
          if (operation === LiveScore.ADD) {
            newPoints = 60;
            endOfGame = true;
          } else {
            newPoints = 30;
          }
        }

        //  40 - 40

        if (this.state.score.p1_points === this.state.score.p2_points) {
          newPoints = operation === LiveScore.ADD ? LiveScore.ADVANTAGE : 30;
        }

        // 40 - AD

        if (
          player === LiveScore.PLAYER_1 &&
          this.state.score.p2_points === LiveScore.ADVANTAGE
        ) {
          if (operation === LiveScore.ADD) {
            player = LiveScore.PLAYER_2; // remove advantage from the other player (go back to 40 - 40)
            newPoints = 40;
          } else {
            newPoints = 30;
          }
        } else if (
          player === LiveScore.PLAYER_2 &&
          this.state.score.p1_points === LiveScore.ADVANTAGE
        ) {
          if (operation === LiveScore.ADD) {
            newPoints = 40; // remove advantage from the other player (go back to 40 - 40)
            player = LiveScore.PLAYER_1;
          } else {
            newPoints = 30;
          }
        }

        break;
      }

      case LiveScore.ADVANTAGE: {
        // AD : 40
        if (operation === LiveScore.ADD) {
          // if +
          endOfGame = true;
          newPoints = 60;
        } else {
          // -
          newPoints = 40;
        }

        break;
      }

      default: {
        console.log('Invalid choice');
        break;
      }
    }

    const newScore = this.state.score;

    if (!(newPoints == null)) {
      // update player's points
      player === LiveScore.PLAYER_1
        ? (newScore.p1_points = newPoints)
        : (newScore.p2_points = newPoints);
    }

    if (!(endOfGame == null)) {
      // if end of game
      newScore.current_game = newScore.current_game += 1; // increase game counter

      player === LiveScore.PLAYER_1
        ? (newScore.p1_games += 1)
        : (newScore.p2_games += 1); // increase player's game

      newScore.p1_points = 0; // reset points
      newScore.p2_points = 0;

      if (this.state.score.serving === LiveScore.PLAYER_1) {
        // toggle serving;
        newScore.serving = LiveScore.PLAYER_2;
      } else {
        newScore.serving = LiveScore.PLAYER_1;
      }

      if (newScore.p1_games === 6 || this.state.score.p2_games === 6) {
        // if end of set

        // update final set score

        switch (this.state.score.current_set) {
          case 1:
            newScore.p1_set1 = this.state.score.p1_games;
            newScore.p2_set1 = this.state.score.p2_games;
            break;
          case 2:
            newScore.p1_set2 = this.state.score.p1_games;
            newScore.p2_set2 = this.state.score.p2_games;
            break;
          case 3:
            newScore.p1_set3 = this.state.score.p1_games;
            newScore.p2_set3 = this.state.score.p2_games;
            break;
        }

        player === LiveScore.PLAYER_1
          ? (newScore.p1_sets += 1)
          : (newScore.p2_sets += 1); // increase player's set

        if (newScore.p1_sets === 2) {
          // if match ended
          newScore.winner = LiveScore.PLAYER_1;
          // api update match
          this.updateWinner(LiveScore.PLAYER_1);
        } else if (newScore.p2_sets === 2) {
          newScore.winner = LiveScore.PLAYER_2;
          // api update match
          this.updateWinner(LiveScore.PLAYER_2);
        } else {
          newScore.current_set += 1; // init new set
          newScore.p1_games = 0;
          newScore.p2_games = 0;
        }
      }
    }


    this.setState({ score: newScore });

    this.updateLiveScore(newScore);
  };

  updateWinner(playerId) {
    this.setState({ displayFeedbackModal: true });
    updateMatchWinnerApi(this.state.score.match_id, playerId).then((responseUpdate) => {
      responseUpdate.status > 400
        ? this.setState({ feedbackText: 'Failed to update winner!' })
        : this.setState({ feedbackText: 'winner updated!' });
    });
  }

  closeFeedbackModal(e) {
    e.preventDefault();
    this.setState({ displayFeedbackModal: false, feedbackText: '' });
  }

  render() {
    const { UmpireStore } = this.props.stores;
    const match = mobx.toJS(UmpireStore.getSingleMatch());

    const FeedbackModal = (
      <FeedBack
        text={this.state.feedbackText}
        handleClose={this.closeFeedbackModal}
      />
    );

    const liveMatch = (
      <div>
        <div className="row">
          {/* players points */}

          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            {/* player 1 points */}

            <Paper
              className={`paper ${
                this.state.score.winner === LiveScore.PLAYER_1 ? 'win' : ''
              }`}
              id={'player1Score'}
              zDepth={2}
            >
              <div class="row">
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'red'}
                    mini={true}
                    className={LiveScore.styles.minusButton}
                    onClick={() =>
                      this.updateScore(
                        LiveScore.PLAYER_1,
                        this.state.score.p1_points,
                        LiveScore.SUBTRACT,
                      )
                    }
                  >
                    <h1>-</h1>
                  </FloatingActionButton>
                </div>
                <div class="col-md-6">
                  <h3>{match.player1}</h3>
                </div>
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'rgb(0, 150, 136)'}
                    className={LiveScore.styles.addButton}
                    onClick={() =>
                      this.updateScore(
                        LiveScore.PLAYER_1,
                        this.state.score.p1_points,
                        LiveScore.ADD,
                      )
                    }
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
                <div class="col-md-12">
                  <Paper style={LiveScore.styles.paperScore}>
                    <h1 style={LiveScore.styles.score}>
                      {this.state.score.p1_points === LiveScore.ADVANTAGE
                        ? 'AD'
                        : this.state.score.p1_points}
                    </h1>
                  </Paper>
                </div>
                <div class="col-md-12">
                  {/* player 1 serving button */}

                  {this.state.score.serving === LiveScore.PLAYER_1 ? (
                    <FloatingActionButton
                      backgroundColor={'#90ec2e'}
                      style={LiveScore.styles.serveButton}
                      onClick={() => this.toggleServing()}
                    >
                      <h5>🎾</h5>
                    </FloatingActionButton>
                  ) : (
                    <FloatingActionButton
                      backgroundColor={'#ffffff'}
                      style={LiveScore.styles.serveButton}
                      onClick={() => this.toggleServing()}
                    />
                  )}
                </div>
              </div>
            </Paper>
          </div>

          {/* player 2 points */}

          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Paper
              className={`paper ${
                this.state.score.winner === LiveScore.PLAYER_2 ? 'win' : ''
              }`}
              id={'player2Score'}
              zDepth={2}
            >
              <div class="row">
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'red'}
                    mini={true}
                    className={LiveScore.styles.minusButton}
                    onClick={() =>
                      this.updateScore(
                        LiveScore.PLAYER_2,
                        this.state.score.p2_points,
                        LiveScore.SUBTRACT,
                      )
                    }
                  >
                    <h1>-</h1>
                  </FloatingActionButton>
                </div>
                <div class="col-md-6">
                  <h3>{match.player2}</h3>
                </div>
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'rgb(0, 150, 136)'}
                    className={LiveScore.styles.addButton}
                    onClick={() =>
                      this.updateScore(
                        LiveScore.PLAYER_2,
                        this.state.score.p2_points,
                        LiveScore.ADD,
                      )
                    }
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
                <div class="col-md-12">
                  <Paper style={LiveScore.styles.paperScore}>
                    <h1 style={LiveScore.styles.score}>
                      {this.state.score.p2_points === LiveScore.ADVANTAGE
                        ? 'AD'
                        : this.state.score.p2_points}
                    </h1>
                  </Paper>
                </div>
                <div className="col-md-12">
                  {this.state.score.serving === LiveScore.PLAYER_2 ? (
                    <FloatingActionButton
                      backgroundColor={'#90ec2e'}
                      style={LiveScore.styles.serveButton}
                      onClick={() => this.toggleServing()}
                    >
                      <h5>🎾</h5>
                    </FloatingActionButton>
                  ) : (
                    <FloatingActionButton
                      backgroundColor={'#ffffff'}
                      style={LiveScore.styles.serveButton}
                      onClick={() => this.toggleServing()}
                    />
                  )}
                </div>
              </div>
            </Paper>
          </div>
        </div>

        {/* sets */}

        <Paper className={'setsMatch'} id={'sets'} zDepth={2}>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
              <h3>sets:</h3>
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-12">
                          {/* set 1 */}

                          <Paper style={LiveScore.styles.paperSetsSquares}>
                            <h1 style={LiveScore.styles.sets}>
                              {this.state.score.current_set === 1
                                ? this.state.score.p1_games
                                : this.state.score.p1_set1}
                            </h1>
                          </Paper>
                        </div>
                        <div className="col-md-12">
                          <Paper style={LiveScore.styles.paperSetsSquares}>
                            <h1 style={LiveScore.styles.sets}>
                              {this.state.score.current_set === 1
                                ? this.state.score.p2_games
                                : this.state.score.p2_set1}
                            </h1>
                          </Paper>
                        </div>
                      </div>
                    </div>

                    {/* set 2 */}

                    {this.state.score.current_set > 1 ? (
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-12">
                            <Paper style={LiveScore.styles.paperSetsSquares}>
                              <h1 style={LiveScore.styles.sets}>
                                {this.state.score.current_set === 2
                                  ? this.state.score.p1_games
                                  : this.state.score.p1_set2}
                              </h1>
                            </Paper>
                          </div>
                          <div className="col-md-12">
                            <Paper style={LiveScore.styles.paperSetsSquares}>
                              <h1 style={LiveScore.styles.sets}>
                                {this.state.score.current_set === 2
                                  ? this.state.score.p2_games
                                  : this.state.score.p2_set2}
                              </h1>
                            </Paper>
                          </div>
                        </div>
                      </div>
                    ) : (
                      false
                    )}

                    {/* set 3 */}

                    {this.state.score.current_set > 2 ? (
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-12">
                            <Paper style={LiveScore.styles.paperSetsSquares}>
                              <h1 style={LiveScore.styles.sets}>
                                {this.state.score.current_set === 3
                                  ? this.state.score.p1_games
                                  : this.state.score.p1_set3}
                              </h1>
                            </Paper>
                          </div>
                          <div className="col-md-12">
                            <Paper style={LiveScore.styles.paperSetsSquares}>
                              <h1 style={LiveScore.styles.sets}>
                                {this.state.score.current_set === 3
                                  ? this.state.score.p2_games
                                  : this.state.score.p2_set3}
                              </h1>
                            </Paper>
                          </div>
                        </div>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* match duration */}

            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className={'row'}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h2>Match Duration:</h2>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3>1:56</h3>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <RaisedButton
                    label="Start Match"
                    secondary={true}
                    disabled={this.state.startDisabled}
                    labelStyle={LiveScore.styles.start}
                    onClick={() => this.startMatch()}
                  />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );

    return (
      <div>
        <MainCard title={'Matches'} content={liveMatch} />
        {this.state.displayFeedbackModal ? FeedbackModal : false}
      </div>
    );
  }
}

export default LiveMatch;
