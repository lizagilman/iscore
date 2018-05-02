import React from 'react';
import Paper from 'material-ui/Paper';
import * as drawStyles from './draws_styles';

export const Tree = (matches, nextMatches) => (
  <div id={'treeContainer'} style={drawStyles.treeContainerStyle}>
    <div style={{ flexGrow: '2' }}>{matches}</div>
    <div style={{ flexGrow: '2' }}>{nextMatches}</div>
  </div>
);

export const Match = (playerA, playerB) => (
  <Paper zDepth={1} style={drawStyles.flexContainerMatch}>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.stageStyle,
        ...drawStyles.matchStyle,
      }}
    >
      {playerA}
    </div>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.stageStyle,
        ...drawStyles.matchStyle,
      }}
    >
      {playerB}
    </div>
  </Paper>
);

export const NextMatch = (playerA, playerB, nextStage) => (
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
      {playerA}
    </div>
    <div
      style={{
        ...drawStyles.basicBlockStyle,
        ...drawStyles.nextMatchStyle,
      }}
    >
      {playerB}
    </div>
  </Paper>
);
