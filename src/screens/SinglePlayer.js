import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Board from '../components/Board';
import DifficultyLevel from '../components/DifficultyLevel';
import {useNavigation, useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');
const cellSize = Math.min(width, height) / 3.5;
const SinglePlayer = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const {params} = useRoute();
  const inititalDifficulty =
    params && params.difficultyLevel ? params.difficultyLevel : 'easy';
  const navigation = useNavigation();
  const initialBoardState = {
    easy: [
      'question',
      'circle',
      'question',
      'question',
      'cross',
      'question',
      'question',
      'circle',
      'question',
    ],
    medium: Array(9).fill('question'),
    hard: Array(9).fill('question'),
  }[inititalDifficulty];
  const [board, setBoard] = useState([
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
  ]);
  const [winner, setWinner] = useState('');
  const [isCross, setIsCross] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(true);

  const handleDifficultySelect = difficulty => {
    setSelectedDifficulty(difficulty);
    startGame();
  };
  const startGame = () => {
    setIsModalVisible(false);
    setIsGameStarted(true);
  };

  useEffect(() => {
    if (!isCross && !winner) {
      if (selectedDifficulty === 'easy' || selectedDifficulty === 'medium') {
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
      } else if (selectedDifficulty === 'hard') {
        // Implement AI move logic for 'hard' difficulty
        setTimeout(() => {
          const bestMove = minimax(board, 'circle', false);
          drawItem(bestMove.index);
        }, 500);
      }
    }
  }, [board, isCross, winner, selectedDifficulty]);
  const minimax = (currentBoard, player, isMaximizing) => {
    const availableCells = currentBoard.reduce((acc, cell, index) => {
      if (cell === 'question') {
        acc.push(index);
      }
      return acc;
    }, []);
    const winningPlayer = winGame(currentBoard);
    if (winningPlayer === 'circle') {
      return {score: 1};
    } else if (winningPlayer === 'cross') {
      return {score: -1};
    } else if (availableCells.length === 0) {
      return {score: 0};
    }
    const moves = [];
    for (let i = 0; i < availableCells.length; i++) {
      const move = {};
      const index = availableCells[i];
      move.index = index;
      currentBoard[index] = player;

      if (isMaximizing) {
        const result = minimax(currentBoard, 'cross', false);
        move.score = result.score;
      } else {
        const result = minimax(currentBoard, 'circle', true);
        move.score = result.score;
      }
      currentBoard[index] = 'question';
      moves.push(move);
    }
    let bestMove;
    if (isMaximizing) {
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
        setBoard(newBoard);
        console.log('new board=====>>>>', newBoard);
        setIsCross(!isCross);
      }
    }
  };
  const resetGame = () => {
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
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[1] &&
      currentBoard[1] === currentBoard[2]
    ) {
      setWinner(currentBoard[0]);
      return currentBoard[0];
    } else if (
      currentBoard[3] !== 'question' &&
      currentBoard[3] === currentBoard[4] &&
      currentBoard[4] === currentBoard[5]
    ) {
      setWinner(currentBoard[3]);
      return currentBoard[3];
    } else if (
      currentBoard[6] !== 'question' &&
      currentBoard[6] === currentBoard[7] &&
      currentBoard[7] === currentBoard[8]
    ) {
      setWinner(currentBoard[6]);
      return currentBoard[6];
    } else if (
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[3] &&
      currentBoard[3] === currentBoard[6]
    ) {
      setWinner(currentBoard[0]);
      return currentBoard[0];
    } else if (
      currentBoard[1] !== 'question' &&
      currentBoard[1] === currentBoard[4] &&
      currentBoard[4] === currentBoard[7]
    ) {
      setWinner(currentBoard[1]);
      return currentBoard[1];
    } else if (
      currentBoard[2] !== 'question' &&
      currentBoard[2] === currentBoard[5] &&
      currentBoard[5] === currentBoard[8]
    ) {
      setWinner(currentBoard[2]);
      return currentBoard[2];
    } else if (
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[4] &&
      currentBoard[4] === currentBoard[8]
    ) {
      setWinner(currentBoard[0]);
      return currentBoard[0];
    } else if (
      currentBoard[2] !== 'question' &&
      currentBoard[2] === currentBoard[4] &&
      currentBoard[4] === currentBoard[6]
    ) {
      setWinner(currentBoard[2]);
      return currentBoard[2];
    } else {
      console.log('No Winner Yet');
      return '';
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={{position: 'absolute', top: 20, left: 20}}
        onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={28} color="#F73D93" />
      </Pressable>
      <Text style={styles.headerText}>Tic Tac Toe {selectedDifficulty}</Text>
      {isGameStarted ? (
        <Board board={board} drawItem={drawItem} cellSize={cellSize} />
      ) : (
        <DifficultyLevel
          onSelectDifficulty={handleDifficultySelect}
          selectedDifficulty={selectedDifficulty}
        />
      )}
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={{flexDirection: 'row'}}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={styles.box}
                onPress={() => drawItem(row, col)}
                disabled={board[row * 3 + col] !== 'question'}>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C0033',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#F73D93',
    fontSize: 30,
    padding: 30,
    marginTop: 5,
  },
  difficultyLevel: {
    padding: 10,
    margin: 10,
  },
  box: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  resetButton: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#7ae582',
    width: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: '#2B2B52',
    fontSize: 15,
  },
  startButton: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#7ae582',
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SinglePlayer;
