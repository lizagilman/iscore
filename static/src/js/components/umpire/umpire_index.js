import React from 'react';
import { inject, observer } from 'mobx-react/index';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import { createSetApi } from '../../api';
import MainCard from '../main_card/main_card_index';

const mobx = require('mobx');

const styles = {
  serveButton: {
    marginTop: '4%',
  },
  start: {
    fontSize: '2em',
  },
  sets: {
    margin: '2%',
    color: 'white',
    fontSize: '4em',
    textAlign: 'center',
  },
  paperSetsSquares: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    margin: 'auto',
  },
  paperScore: {
    height: '100%',
    width: '40%',
    backgroundColor: 'black',
    margin: 'auto',
  },

  score: {
    margin: '2%',
    color: 'white',
    fontSize: '6em',
  },
  addButton: {
    height: '20%',
    width: '20%',
  },
  minusButton: {
    height: '10%',
    width: '10%',
  },
};
@inject('stores')
@observer
class Match extends React.Component {
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
      },
    };

    this.socket = null;

    this.toggleServing = this.toggleServing.bind(this);
    this.addScore = this.addScore.bind(this);
    this.subtractScore = this.subtractScore.bind(this);
    this.startMatch = this.startMatch.bind(this);
    this.updateLiveScore = this.updateLiveScore.bind(this);
  }

  toggleServing = () => {
    this.setState(prevState => ({
      serving: !prevState.serving,
    }));
  };

  startMatch = () => {
    const set = {
      set_num: '1',
      Matches: '1',
    };
    createSetApi(set);
    this.setState({ startDisabled: true });
  };

  update_state = (data) => {
    this.setState(data);
  };

  componentWillMount() {
    const self = this;

    const { UmpireStore } = this.props.stores;

    const match = mobx.toJS(UmpireStore.getSingleMatch());

    console.log('match_id: ', match.id);

    this.setState({ match_id: match.id });
    this.setState({ score: { ...this.state.score, match_id: match.id } });

    this.socket = new WebSocket(`ws://iscore-app.herokuapp.com/ws/iscore/match/${match.id}/`);

    // recieve

    this.socket.onmessage = function (event, that = self) {
      const score = JSON.parse(event.data).message;

      that.update_state({ score });
    };
  }

  updateLiveScore(newScore) {
    this.socket.send(JSON.stringify(newScore));
  }

  addScore = (num) => {
    let newPoints = null;
    let myScore = null;
    if (num === 1) {
      myScore = this.state.score.p1_points;
    } else if (num === 2) {
      myScore = this.state.score.p2_points;
    }
    switch (myScore) {
      case 0: {
        newPoints = 15;
        break;
      }
      case 15: {
        newPoints = 30;
        break;
      }
      case 30: {
        newPoints = 40;
        break;
      }
      case 40: {
        if (this.state.score.p1_points === this.state.score.p2_points) {
          newPoints = 100;
        } else {
          newPoints = 60;
        }
        break;
      }

      case 100: {
        newPoints = 60;
        break;
      }

      case 60: {
        newPoints = 60;
        // TO-DO: update sets
        break;
      }

      default: {
        console.log('Invalid choice');
        break;
      }
    }

    let newScore = this.state.score;

    if (newPoints && num === 1) {
      newScore = { ...this.state.score, p1_points: newPoints };
    } else if (newPoints && num === 2) {
      newScore = { ...this.state.score, p2_points: newPoints };
    }

    this.setState({ score: newScore });

    this.updateLiveScore(newScore);
  };

  subtractScore = (num) => {
    let newPoints = null;
    let myScore = null;

    if (num === 1) {
      myScore = this.state.score.p1_points;
    } else if (num === 2) {
      myScore = this.state.score.p2_points;
    }

    switch (myScore) {
      case 0: {
        newPoints = 0;
        break;
      }
      case 15: {
        newPoints = 0;
        break;
      }
      case 30: {
        newPoints = 15;
        break;
      }
      case 40: {
        newPoints = 30;
        break;
      }
      case 100: {
        newPoints = 40;
        break;
      }
      case 60: {
        newPoints = 60;
        break;
      }
      default: {
        break;
      }
    }

    let newScore = this.state.score;

    if (newPoints && num === 1) {
      newScore = { ...this.state.score, p1_points: newPoints };
    } else if (newPoints && num === 2) {
      newScore = { ...this.state.score, p2_points: newPoints };
    }

    this.setState({ score: newScore });

    this.updateLiveScore(newScore);
  };

  render() {
    const { UmpireStore } = this.props.stores;
    const match = mobx.toJS(UmpireStore.getSingleMatch());

    const Match = (
      <div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Paper className={'paper'} id={'player1Score'} zDepth={2}>
              <div class="row">
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'red'}
                    mini={true}
                    className={styles.minusButton}
                    onClick={() => this.subtractScore(1)}
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
                    className={styles.addButton}
                    onClick={() => this.addScore(1)}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
                <div class="col-md-12">
                  <Paper style={styles.paperScore}>
                    <h1 style={styles.score}>
                      {this.state.score.p1_points === 100
                        ? 'AD'
                        : this.state.score.p1_points}
                    </h1>
                  </Paper>
                </div>
                <div class="col-md-12">
                  <FloatingActionButton
                    backgroundColor={
                      this.state.serving === true ? 'yellow' : 'white'
                    }
                    style={styles.serveButton}
                    onClick={() => this.toggleServing()}
                  >
                    {this.state.serving === true ? <h5>🎾</h5> : ''}
                  </FloatingActionButton>
                </div>
              </div>
            </Paper>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Paper className={'paper'} id={'player2Score'} zDepth={2}>
              <div class="row">
                <div className="col-md-3">
                  <FloatingActionButton
                    backgroundColor={'red'}
                    mini={true}
                    className={styles.minusButton}
                    onClick={() => this.subtractScore(2)}
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
                    className={styles.addButton}
                    onClick={() => this.addScore(2)}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
                <div class="col-md-12">
                  <Paper style={styles.paperScore}>
                    <h1 style={styles.score}>
                      {this.state.score.p2_points === 100
                        ? 'AD'
                        : this.state.score.p2_points}
                    </h1>
                  </Paper>
                </div>
                <div className="col-md-12">
                  <FloatingActionButton
                    backgroundColor={
                      this.state.serving === true ? 'white' : 'yellow'
                    }
                    style={styles.serveButton}
                    onClick={() => this.toggleServing()}
                  >
                    {this.state.serving === true ? '' : <h5>🎾</h5>}
                  </FloatingActionButton>
                </div>
              </div>
            </Paper>
          </div>
        </div>

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
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p1_set1}
                            </h1>
                          </Paper>
                        </div>
                        <div className="col-md-12">
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p2_set1}
                            </h1>
                          </Paper>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-12">
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p1_set2}
                            </h1>
                          </Paper>
                        </div>
                        <div className="col-md-12">
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p1_set2}
                            </h1>
                          </Paper>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="col-md-12">
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p1_set3}
                            </h1>
                          </Paper>
                        </div>
                        <div className="col-md-12">
                          <Paper style={styles.paperSetsSquares}>
                            <h1 style={styles.sets}>
                              {this.state.score.p2_set3}
                            </h1>
                          </Paper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <div className={'row'}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h2>time:</h2>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h3>1:56</h3>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <RaisedButton
                    label="Start Match"
                    secondary={true}
                    disabled={this.state.startDisabled}
                    labelStyle={styles.start}
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
        <MainCard title={'Matches'} content={Match} />
      </div>
    );
  }
}

export default Match;
