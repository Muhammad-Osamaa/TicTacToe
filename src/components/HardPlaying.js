import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ModalView from './ModalView';

function Square({value, onPress}) {
  const {width, height} = Dimensions.get('window');
  const squareSize = Math.min(width, height) * 0.25;
  const iconMap = {
    X: 'cross',
    O: 'circle',
  };
  return (
    <TouchableOpacity
      style={[styles.square, {width: width / 3.5, height: height / 7}]}
      onPress={onPress}
      disabled={value !== null}>
      {value !== null && (
        <Entypo
          name={iconMap[value]}
          size={50}
          color={value === 'X' ? '#FF3031' : '#45CE30'}
        />
      )}
    </TouchableOpacity>
  );
}

function Board({squares, onPress}) {
  return (
    <View style={styles.board}>
      {[0, 1, 2].map(row => (
        <View key={row} style={{flexDirection: 'row'}}>
          {[0, 1, 2].map(col => (
            <Square
              key={col}
              value={squares[row * 3 + col]}
              onPress={() => onPress(row * 3 + col)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export default function HardPlaying() {
  const navigation = useNavigation();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {width, height} = Dimensions.get('window');
  const boardSize = Math.min(width, height) * 0.8;
  const calculateWinner = squares => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFilled = squares => {
    return squares.every(square => square !== null);
  };

  const findBestSquare = (squares, player) => {
    const opponent = player === 'X' ? 'O' : 'X';

    const minimax = (squares, isMax) => {
      const winner = calculateWinner(squares);

      if (winner === player) return {square: -1, score: 1};
      if (winner === opponent) return {square: -1, score: -1};
      if (isBoardFilled(squares)) return {square: -1, score: 0};

      const best = {square: -1, score: isMax ? -1000 : 1000};
      for (let i = 0; i < squares.length; i++) {
        if (squares[i]) {
          continue;
        }
        squares[i] = isMax ? player : opponent;
        const score = minimax(squares, !isMax).score;
        squares[i] = null;

        if (isMax) {
          if (score > best.score) {
            best.score = score;
            best.square = i;
          }
        } else {
          if (score < best.score) {
            best.score = score;
            best.square = i;
          }
        }
      }

      return best;
    };

    return minimax(squares, true).square;
  };

  const makeMove = async i => {
    const newBoard = [...board];

    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }

    newBoard[i] = 'X';

    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      showAlert(`${winner} Won The Game`, resetBoard);
    } else if (isBoardFilled(newBoard)) {
      showAlert("It's a Tie!", resetBoard);
    } else {
      const bestSquare = findBestSquare(newBoard, 'O');

      if (bestSquare !== -1) {
        newBoard[bestSquare] = 'O';
        setBoard(newBoard);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
          showAlert(`${newWinner} Won The Game`, resetBoard);
        } else if (isBoardFilled(newBoard)) {
          showAlert("It's a Tie!", resetBoard);
        }
      }
    }
  };

  const showAlert = (message, callback) => {
    setModalMessage(message);
    setModalVisible(true);
  };
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
  };
  const handleBackButton = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={handleBackButton}>
        <Entypo name="chevron-left" size={45} color="#C7EEFF" />
      </Pressable>
      <Text style={{color: '#C7EEFF', fontSize: 30, padding: 30, marginTop: 5}}>
        Hard Mode
      </Text>
      <View style={[styles.board, {width: boardSize, height: boardSize}]}>
        <Board squares={board} onPress={i => makeMove(i)} />
      </View>
      <ModalView
        visible={modalVisible}
        onCloseModal={() => {
          setModalVisible(false);
          resetBoard();
        }}>
        <Text style={styles.modalText}>{modalMessage}</Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            resetBoard();
          }}
          style={styles.modalButton}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </ModalView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10316B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#10316B',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#10316B',
  },
  squareText: {
    fontSize: 50,
    color: 'red',
  },
  modalText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C7EEFF',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#C7EEFF',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#279EFF',
    paddingVertical: 2,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  buttonText: {
    borderWidth: 1.5,
    borderColor: '#279EFF',
    backgroundColor: '#10316b',
    color: '#C7EEFF',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '600',
    paddingHorizontal: '15%',
    paddingVertical: 5,
    borderRadius: 5,
  },
});
