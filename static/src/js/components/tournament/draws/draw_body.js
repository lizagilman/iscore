import React from 'react';
import Paper from 'material-ui/Paper';
import Done from 'material-ui/svg-icons/action/done';
import * as drawStyles from './draws_styles';

export const Tree = (matches, nextMatches) => (
  <div id={'treeContainer'} style={drawStyles.treeContainerStyle}>
    <div style={{ flexGrow: '2' }}>{matches}</div>
    <div style={{ flexGrow: '2' }}>{nextMatches}</div>
  </div>
);

export const Match = (playerA, playerB, winner) => (
  <Paper zDepth={1} style={drawStyles.flexContainerMatch}>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.stageStyle,
        ...drawStyles.matchStyle,
      }}
    >
      {playerA === winner ? (
        <span>
          <img
            src={
              'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/trophy.png'
            }
            className={'trophy'}
          />
        </span>
      ) : (
        false
      )}
      <span className={playerA === winner ? 'matchWinner' : false}>
        {playerA}
      </span>
    </div>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.stageStyle,
        ...drawStyles.matchStyle,
      }}
    >
      {playerB === winner ? (
        <span>
          <img
            src={
              'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/trophy.png'
            }
            className={'trophy'}
          />
        </span>
      ) : (
        false
      )}
      <span className={playerB === winner ? 'matchWinner' : false}>
        {playerB}
      </span>
    </div>
  </Paper>
);

export const NextMatch = (playerA, playerB, winner, nextStage) => (
  <Paper
    zDepth={1}
    style={
      nextStage === 'F'
        ? {
            ...drawStyles.flexContainerMatch,
            ...drawStyles.flexContainerNextMatchFinal,
          }
        : {
            ...drawStyles.flexContainerMatch,
            ...drawStyles.flexContainerNextMatch,
          }
    }
  >
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.nextMatchStyle,
      }}
    >
      {playerA === winner ? (
        <span>
          <img
            src={
              'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/trophy.png'
            }
            className={'trophy'}
          />
        </span>
      ) : (
        false
      )}
      <span className={playerA === winner ? 'matchWinner' : false}>
        {playerA}
      </span>
    </div>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.nextMatchStyle,
      }}
    >
      {playerB === winner ? (
        <span>
          <img
            src={
              'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/trophy.png'
            }
            className={'trophy'}
          />
        </span>
      ) : (
        false
      )}
      <span className={playerB === winner ? 'matchWinner' : false}>
        {playerB}
      </span>
    </div>
  </Paper>
);
