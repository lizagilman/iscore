import React from 'react';
import Paper from 'material-ui/Paper';
import Done from 'material-ui/svg-icons/action/done';
import * as drawStyles from './draws_styles';

export const R16 = '1st Round';
export const QF = 'Quarter Final';
export const SF = 'Semi Final';
export const F = 'Final';

export const stages = [R16, QF, SF, F];

export const Tree = (matches, nextMatches) => (
  <div id={'treeContainer'} style={drawStyles.treeContainerStyle}>
    <div style={{ flexGrow: '2', left: '5.5%', position: 'relative' }}>
      {matches}
    </div>
    <div style={{ flexGrow: '2', right: '5.5%', position: 'relative' }}>
      {nextMatches}
    </div>
  </div>
);

export const Match = (playerA, playerB, winner) => (
  <Paper zDepth={1} style={drawStyles.flexContainerMatch}>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.stageStyle,
        ...drawStyles.matchStyle,
        ...drawStyles.playerAStyle,
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
        ...drawStyles.playerBStyle,
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

export const NextMatch = (playerA, playerB, winner, nextStage, matchIndex) => (
  <Paper
    zDepth={1}
    style={
      nextStage === F
        ? {
            ...drawStyles.flexContainerMatch,
            ...drawStyles.flexContainerNextMatchFinal,
          }
        : {
            height:
              nextStage === SF
                ? '47.5%'
                : drawStyles.flexContainerNextMatch.height,
            ...drawStyles.flexContainerMatch,
            maxHeight: matchIndex === 22 ? '22%' : false,
          }
    }
  >
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.nextMatchStyle,
        ...drawStyles.playerAStyle,
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
        ...drawStyles.playerBStyle,
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
