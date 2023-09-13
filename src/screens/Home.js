import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import DifficultyLevel from '../components/DifficultyLevel';
import ModalView from '../components/ModalView';

const Home = ({navigation}) => {
  const [difficultyLevel, setDifficultyLevel] = useState('easy');
  const [showModal, setShowModal] = useState(true);
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');

  const handleModalSelection = selectedOption => {
    setShowModal(false);
  };

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
  return (
    <View style={styles.container}>
      <ModalView visible={showModal} onSelectMode={handleModalSelection} />
      <View style={styles.mainView}>
        <Text style={styles.mainText}>Tic Tac Toe</Text>
        <DifficultyLevel
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          style={styles.difficultyLevel}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.firstButton}
          onPress={() => navigation.navigate('TicTacToe')}>
          <Text style={styles.firstButtonText}>Single player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondButton}>
          <Text style={styles.secondButtonText}>Play With AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.thirdButton}>
          <Text style={styles.thirdButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {},
  mainText: {
    fontSize: 16,
    color: '#000',
  },
  buttonView: {},
  firstButton: {},
  firstButtonText: {},
  secondButton: {},
  secondButtonText: {},
  thirdButton: {},
  thirdButtonText: {},
});
export default Home;
