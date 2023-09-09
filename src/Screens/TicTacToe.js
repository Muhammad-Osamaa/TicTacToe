import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Board from './Board';
import GameMessage from './GameMessage';
import DifficultyLevel from './DifficultyLevel';

const {width, height} = Dimensions.get('screen');

const TicTacToe = () => {
  const cellSize = Math.min(width, height) / 6;
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  
  const makeAIMove = () => {
    if (!isCross && !winner) {
      if (difficultyLevel === 'easy') {
        const emptyCells = board.reduce((acc, cell, index) => {
          if (cell === 'question') {
            acc.push(index);
          }
          return acc;
        }, []);
        if (emptyCells.length > 0) {
          const randomIndex =
            emptyCells[Math.floor(Math.random() * emptyCells.length)];
          const row = Math.floor(randomIndex / 3);
          const col = randomIndex % 3;
          drawItem(row, col);
        }
      } else if (difficultyLevel === 'hard') {
        const bestMove = minimax(board, 'circle', isCross);
        drawItem(bestMove.row, bestMove.col);
      }
    }
  };
  useEffect(() => {
    makeAIMove();
  }, [isCross, winner]);

  const minimax = (currentBoard, player) => {
    const availableCells = currentBoard.reduce((acc, cell, index) => {
      if (cell === 'question') {
        acc.push(index);
      }
      return acc;
    }, []);
    if (winner === 'cross') {
      return {score: -1};
    } else if (winner === 'circle') {
      return {score: 1};
    } else if (availableCells.length === 0) {
      return {score: 0};
    }
    const moves = [];
    for (let i = 0; i < availableCells.length; i++) {
      const move = {};
      const index = availableCells[i];
      move.index = index;
      currentBoard[index] = player;

      if (player === 'circle') {
        const result = minimax(currentBoard, 'cross');
        move.score = result.score;
      } else {
        const result = minimax(currentBoard, 'circle');
        move.score = result.score;
      }

      currentBoard[index] = 'question';
      moves.push(move);
    }

    let bestMove;
    if (player === 'circle') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  useEffect(() => {
    if (winner !== '') {
      Alert.alert(
        winner + ' Won The Game',
        '',
        [
          {
            text: 'OK',
            onPress: () => resetGame(),
          },
        ],
        {backgroundColor: '#2B2B52', color: '#FFFFF'},
      );
    }
  }, [winner]);
  const drawItem = (row, col) => {
    console.log('drawItem function called');
    const index = row * 3 + col;
    if (board[index] === 'question' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = isCross ? 'cross' : 'circle';

      const winningPlayer = winGame(newBoard);
      if (winningPlayer !== '') {
        setWinner(winningPlayer);
        Alert.alert(
          winningPlayer + 'Won The Game',
          '',
          [
            {
              text: 'OK',
              onPress: () => resetGame(),
            },
          ],
          {backgroundColor: '#2B2B52', color: '#FFFFF'},
        );
      } else if (!newBoard.includes('question')) {
        Alert.alert(
          'The game is drawn',
          '',
          [
            {
              text: 'OK',
              onPress: () => resetGame(),
            },
          ],
          {
            backgroundColor: 'red',
            color: '#FFFFF',
          },
        );
      } else {
        setIsCross(!isCross);
        setBoard(newBoard);
      }
    }
  };

  const resetGame = () => {
    setIsCross(true);
    setBoard(Array(9).fill('question'));
    setWinner('');
  };

  const chooseItemColor = (row, col) => {
    const index = row * 3 + col;
    if (board[index] === 'cross') return '#FF3031';
    else if (board[index] === 'circle') return '#45CE30';
    return '#74B9FF';
  };

  const winGame = currentBoard => {
    if (
      board[0] !== 'question' &&
      board[0] === board[1] &&
      board[1] === board[2]
    ) {
      setWinner(board[0]);
      return board[0];
    } else if (
      board[3] !== 'question' &&
      board[3] === board[4] &&
      board[4] === board[5]
    ) {
      setWinner(board[3]);
      return board[3];
    } else if (
      board[6] !== 'question' &&
      board[6] === board[7] &&
      board[7] === board[8]
    ) {
      setWinner(board[6]);
      return board[6];
    } else if (
      board[0] !== 'question' &&
      board[0] === board[3] &&
      board[3] === board[6]
    ) {
      setWinner(board[0]);
      return board[0];
    } else if (
      board[1] !== 'question' &&
      board[1] === board[4] &&
      board[4] === board[7]
    ) {
      setWinner(board[1]);
      return board[1];
    } else if (
      board[2] !== 'question' &&
      board[2] === board[5] &&
      board[5] === board[8]
    ) {
      setWinner(board[2]);
      return board[2];
    } else if (
      board[0] !== 'question' &&
      board[0] === board[4] &&
      board[4] === board[8]
    ) {
      setWinner(board[0]);
      return board[0];
    } else if (
      board[2] !== 'question' &&
      board[2] === board[4] &&
      board[4] === board[6]
    ) {
      setWinner([2]);
      return board[2];
    } else {
      console.log('No Winner Yet');
      return '';
    }
  };
  useEffect(() => {
    setBoard([
      'cross',
      'circle',
      'question',
      'question',
      'question',
      'question',
      'question',
      'question',
      'question',
    ]);
    resetGame();
  }, []);
  // useEffect(() => {
  //   if (winner !== '') {
  //     Alert.alert(winner + 'Won The Game');
  //   }
  // }, [winner]);

  return (
    <View style={styles.container}>
      <Text style={{color: '#01CBC6', fontSize: 30, padding: 30}}>
        Tic Tac Toe
      </Text>
      <DifficultyLevel
        difficultyLevel={difficultyLevel}
        setDifficultyLevel={setDifficultyLevel}
      />
      <View>
        {[0, 1, 2].map(row => (
          <View key={row} style={{flexDirection: 'row'}}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={{
                  width: cellSize,
                  height: cellSize,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#2B2B52',
                }}
                onPress={() => drawItem(row, col)}
                disabled = {board[row * 3 + col] !== 'question'}>
                {board[row * 3 + col] === 'question' ? (
                  <Text
                    style={{
                      fontSize: cellSize / 2,
                      color: chooseItemColor(row, col),
                    }}>
                    ?
                  </Text>
                ) : (
                  <Entypo
                    name={board[row * 3 + col]}
                    size={cellSize / 2}
                    color={chooseItemColor(row, col)}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#E74292',
          width: 140,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={resetGame}>
        <MaterialCommunityIcons
          name="restart-alert"
          size={22}
          color="#2B2B52"
        />
        <Text style={{color: '#2B2B52', fontSize: 15}}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TicTacToe;
