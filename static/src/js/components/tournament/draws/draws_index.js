import React from 'react';
import * as mobx from 'mobx';
import { inject, observer } from 'mobx-react/index';
import Paper from 'material-ui/Paper';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import * as drawStyles from './draws_styles';
import { Tree, Match, NextMatch } from './draw_body';
import Spinner from '../../spinner/spinner';

@inject('stores')
@observer
export default class Draws extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prevStage: null, currentStage: 'R16', nextStage: 'QF' };
    this.arrowForwardClick = this.arrowForwardClick.bind(this);
    this.arrowBackClick = this.arrowBackClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { categoryToDisplay: null, }
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
    const { TournamentStore } = this.props.stores;

    if (!TournamentStore.tournamentCategories.length) {
      TournamentStore.getCategories(this.props.tournamentId || parseInt(this.props.match.params.id, 10)).then(categories => {
debugger
        this.setState({
          categoryToDisplay: categories[0].id,
        });

      });
    }
  }


  handleChange = (category) => {
    this.setState({
      categoryToDisplay: category,
    });
  };

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
      let nextMatchCounter = 0;

      if (this.state.currentStage === 'R16') {
        matches = DrawsStore.matchesR16.map(matchR16 =>
          Match(matchR16.player1, matchR16.player2, matchR16.winner));
        nextMatches = DrawsStore.matchesQF.map(matchQF => NextMatch(
          matchQF.player1
            ? matchQF.player1
            : `Winner of R16 ${++nextMatchCounter}`,
          matchQF.player2
            ? matchQF.player2
            : `Winner of R16 ${++nextMatchCounter}`,
          matchQF.winner,
          this.state.nextStage,
        ));
      } else {
        matches = DrawsStore.matchesSF.map(matchSF =>
          Match(
            matchSF.player1
              ? matchSF.player1
              : `Winner of QF ${++nextMatchCounter}`,
            matchSF.player2
              ? matchSF.player2
              : `Winner of QF ${++nextMatchCounter}`,
            matchSF.winner,
            this.state.nextStage,
          ));
        nextMatches = DrawsStore.matchesF.map((matchF) => {
          nextMatchCounter = 0;

          return NextMatch(
            matchF.player1
              ? matchF.player1
              : `Winner of SF ${++nextMatchCounter}`,
            matchF.player2
              ? matchF.player2
              : `Winner of SF ${++nextMatchCounter}`,
            matchF.winner,
            this.state.nextStage,
          );
        });
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
      <div>{Spinner(70)}</div>
    );


    const createTab = (category, index) => (
      <Tab label={category} value={index} key={index}>
        category.had_draw ? <h1>tree</h1> : <h1>generate draw</h1>
        {/*draw tree here*/}
      </Tab>
    );

    const createTabs = (data) => {
      const tabs = [];

      Object.keys(data).forEach((category, index) => {
          tabs.push(createTab(category, index + 1));
        }
      );
      return tabs;
    };


    debugger

    return (
      <div>







        {/*<div>*/}
        {/*{categories ? (*/}
        {/*categories.map((category, index) => (*/}
        {/*<div>*/}
        {/*<a key={index}>{category.category}</a>*/}

        {/*<FlatButton*/}
        {/*label="Generate/ Display Draw"*/}
        {/*primary={true}*/}
        {/*onClick={() => {*/}
        {/*DrawsStore.getCategoryDraw(category.id);*/}
        {/*this.forceUpdate();*/}
        {/*}}*/}
        {/*/>*/}
        {/*<FlatButton*/}
        {/*label="Delete Draw"*/}
        {/*primary={true}*/}
        {/*onClick={() => {*/}
        {/*DrawsStore.deleteDraw(category.id);*/}
        {/*this.forceUpdate();*/}
        {/*}}*/}
        {/*/>*/}
        {/*</div>*/}
        {/*))*/}
        {/*) : (*/}
        {/*<div>{Spinner(70)}</div>*/}
        {/*)}*/}
        {/*</div>*/}






        <div>
          {categories ? (

            <Tabs
              value={this.state.categoryToDisplay}
              onChange={this.handleChange}
            >
              {createTabs(categories)}
            </Tabs>


          ) : (
            <div>{Spinner(70)}</div>
          )}
        </div>










        {/*<div>{drawTree}</div>*/}
      </div>
    );
  }
}
