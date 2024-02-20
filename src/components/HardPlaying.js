import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ModalView from './ModalView';

function Square({value, onPress, isTouched, index, borderColor}) {
  const [touched, setTouched] = useState(isTouched);
  useEffect(() => {
    setTouched(isTouched);
  }, [isTouched]);

  const chooseItemColor = (row, col) => {
    const index = row * 3 + col;
    const borderColor = borderColors[index % borderColors.length];
    switch (borderColor) {
      case '#FF5733':
        return '#FFE3DD';
      case '#FFC300':
        return '#FFF7DD';
      case '#DAF7A6':
        return '#F3FDE1';
      case '#9A12B3':
        return '#EDD7F2';
      case '#3498DB':
        return '#DDEDF9';
      case '#E74C3C':
        return '#FADAD6';
      case '#F1C40F':
        return '#FDF5D7';
      case '#2ECC71':
        return '#DCF6E7';
      case '#8E44AD':
        return '#F0E5F4';
      default:
        return '#E4E4E4';
    }
  };
  const squareBorderColor = touched
    ? borderColors[index % borderColors.length]
    : '#EEF5FF';
  return (
    <TouchableOpacity
      style={[
        styles.square,
        {
          backgroundColor: touched
            ? chooseItemColor(Math.floor(index / 3), index % 3)
            : '#EEF5FF',
          borderColor: squareBorderColor,
        },
      ]}
      onPress={() => {
        onPress(index);
        setTouched(true);
      }}
      disabled={value !== null || touched}>
      {value !== null && (
        <Entypo
          name={value === 'X' ? 'cross' : 'circle'}
          size={50}
          color={squareBorderColor}
        />
      )}
    </TouchableOpacity>
  );
}
const borderColors = [
  '#FF5733',
  '#FFC300',
  '#DAF7A6',
  '#9A12B3',
  '#3498DB',
  '#E74C3C',
  '#F1C40F',
  '#2ECC71',
  '#8E44AD',
];

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
              isTouched={squares[row * 3 + col] !== null}
              index={row * 3 + col}
              borderColor={borderColors[(row * 3 + col) % borderColors.length]}
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
  const [fadeInAnim] = useState(new Animated.Value(0));
  const [bounceAnim] = useState(new Animated.Value(0.8));
  const [imageAnim] = useState(new Animated.Value(0));
  const boardSize = Math.min(width, height) * 0.8;
  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  }, []);
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
      <View style={styles.mainContainer}>
        <Pressable style={styles.backButton} onPress={handleBackButton}>
          <Entypo name="chevron-left" size={45} color="#C7EEFF" />
        </Pressable>
        <Text style={styles.headerText}>Hard Mode</Text>
      </View>
      <Animated.View style={[styles.main, {opacity: fadeInAnim}]}>
        <Animated.Image
          source={require('../assets/images/img1.png')}
          style={{
            width: width * 0.3,
            height: height * 0.2,
            transform: [{scale: bounceAnim}],
          }}
        />
      </Animated.View>
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
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    color: '#C7EEFF',
    fontSize: 28,
    fontFamily: 'sans-serif-medium',
    fontStyle: 'italic',
  },
  main: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  square: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').width / 3.5,
    aspectRatio: 1,
    borderWidth: 2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  squareText: {
    fontSize: 50,
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
