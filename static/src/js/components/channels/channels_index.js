import React from 'react';

export default class ChannelsTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: 1,
      game: 1,
    };
  }

  update_state = (data) => {
    this.setState(data);
  };

  send_data = () => {

  };
  componentWillMount() {
    let curSet;
    let curGame;
    const self = this;
    //
    //
    const exampleSocket = new WebSocket('ws://iscore-app.herokuapp.com/ws/iscore/match/168/');
    exampleSocket.onmessage = function (event, that = self) {
      console.log(event.data);
      const score = JSON.parse(event.data).message;

      that.update_state({ set: score.current_set, game: score.current_game });
    };

    const msg =
 {
   id: 1,
   current_set: 5,
   current_game: 10,
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
   p1_points: 500,
   p2_points: 100,
   match_id: 168,
 };

    exampleSocket.onopen = function (event) {
      exampleSocket.send(JSON.stringify(msg));
    };
  }

  render() {
    return (
      <div>
        <h1>Set: {this.state.set}</h1>

        <h1>Game: {this.state.game}</h1>
      </div>
    );
  }
}
