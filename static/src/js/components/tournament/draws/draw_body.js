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

const showScore = (id) => {
  if (document.getElementById(`score-${id}`).children.length) {
    document.getElementById(`score-${id}`).style.display = 'block';
  }
};

const hideScore = (id) => {
  if (document.getElementById(`score-${id}`).children.length) {
    document.getElementById(`score-${id}`).style.display = 'none';
  }
};

export const Match = (playerA, playerB, winner, style1, matchId, score) => (
  <Paper
    zDepth={1}
    style={drawStyles.flexContainerMatch}
    onMouseEnter={(e) => {
      e.preventDefault();
      showScore(matchId);
    }}
    onMouseLeave={(e) => {
      e.preventDefault();
      hideScore(matchId);
    }}
  >
    <div
      style={
        style1
          ? {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.stageStyle,
              ...drawStyles.matchStyle,
              ...drawStyles.playerAstyle1,
            }
          : {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.stageStyle,
              ...drawStyles.matchStyle,
              ...drawStyles.playerAstyle2,
            }
      }
    >
      {winner && playerA === winner ? (
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
      style={
        style1
          ? {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.stageStyle,
              ...drawStyles.matchStyle,
              ...drawStyles.playerBstyle1,
            }
          : {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.stageStyle,
              ...drawStyles.matchStyle,
              ...drawStyles.playerBstyle2,
            }
      }
    >
      {winner && playerB === winner ? (
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

    <div id={`score-${matchId}`} className="score">
      {winner && score && score.p1_set1 ? (
        <table>
          <tr>
            <td className={score.p1_set1 > score.p2_set1 ? 'setWinner' : false}>
              {score.p1_set1}
            </td>
            <td className={score.p1_set2 > score.p2_set2 ? 'setWinner' : false}>
              {score.p1_set2}
            </td>
            <td className={score.p1_set3 > score.p2_set3 ? 'setWinner' : false}>
              {score.p1_set3}
            </td>
          </tr>
          <tr>
            <td className={score.p2_set1 > score.p1_set1 ? 'setWinner' : false}>
              {score.p2_set1}
            </td>
            <td className={score.p2_set2 > score.p1_set2 ? 'setWinner' : false}>
              {score.p2_set2}
            </td>
            <td className={score.p2_set3 > score.p1_set3 ? 'setWinner' : false}>
              {score.p2_set3}
            </td>
          </tr>
        </table>
      ) : (
        false
      )}
    </div>
  </Paper>
);

export const NextMatch = (
  playerA,
  playerB,
  winner,
  nextStage,
  matchIndex,
  style1,
  matchId,
  score,
) => (
  <Paper
    onMouseEnter={(e) => {
      e.preventDefault();
      showScore(matchId);
    }}
    onMouseLeave={(e) => {
      e.preventDefault();
      hideScore(matchId);
    }}
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
      style={
        style1
          ? {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.nextMatchStyle,
              ...drawStyles.playerAstyle1,
            }
          : {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.nextMatchStyle,
              ...drawStyles.playerAstyle2,
            }
      }
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
      style={
        style1
          ? {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.nextMatchStyle,
              ...drawStyles.playerBstyle1,
            }
          : {
              ...drawStyles.basicBlockStyle,
              ...drawStyles.nextMatchStyle,
              ...drawStyles.playerBstyle2,
            }
      }
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
    <div id={`score-${matchId}`} className="score">
      {winner && score && score.p1_set1 ? (
        <table>
          <tr>
            <td className={score.p1_set1 > score.p2_set1 ? 'setWinner' : false}>
              {score.p1_set1}
            </td>
            <td className={score.p1_set2 > score.p2_set2 ? 'setWinner' : false}>
              {score.p1_set2}
            </td>
            <td className={score.p1_set3 > score.p2_set3 ? 'setWinner' : false}>
              {score.p1_set3}
            </td>
          </tr>
          <tr>
            <td className={score.p2_set1 > score.p1_set1 ? 'setWinner' : false}>
              {score.p2_set1}
            </td>
            <td className={score.p2_set2 > score.p1_set2 ? 'setWinner' : false}>
              {score.p2_set2}
            </td>
            <td className={score.p2_set3 > score.p1_set3 ? 'setWinner' : false}>
              {score.p2_set3}
            </td>
          </tr>
        </table>
      ) : (
        false
      )}
    </div>
  </Paper>
);
