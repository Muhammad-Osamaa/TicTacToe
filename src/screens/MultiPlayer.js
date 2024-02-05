import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import ModalView from '../components/ModalView';
const {width, height} = Dimensions.get('screen');

const MultiPlayer = () => {
  const navigation = useNavigation();
  const cellSize = Math.min(width, height) / 3.5;
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [lastTouchedCell, setLastTouchedCell] = useState(null);
  const [touchedCells, setTouchedCells] = useState(Array(9).fill(false));
  const [fadeInAnim] = useState(new Animated.Value(0));
  const [bounceAnim] = useState(new Animated.Value(0.8));
  const [imageAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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

  useEffect(() => {
    if (winner !== '') {
      setModalContent(`${winner} Won the Game`);
      setModalVisible(true);
    }
  }, [winner]);
  const resetAnimation = () => {
    imageAnim.setValue(0);
  };
  const drawItem = (row, col) => {
    const index = row * 3 + col;
    if (board[index] === 'question') {
      const newBoard = [...board];
      newBoard[index] = isCross ? 'cross' : 'circle';
      setBoard(newBoard);
      const winningPlayer = winGame(newBoard);
      if (winningPlayer !== '') {
        setWinner(winningPlayer);
      } else if (!newBoard.includes('question')) {
        setModalContent('The Game is drawn');
        setModalVisible(true);
      } else {
        setIsCross(!isCross);
      }
      setTouchedCells(prevState => {
        const updatedCells = [...prevState];
        updatedCells[index] = true;
        return updatedCells;
      });
      setLastTouchedCell(index);
      triggerAnimation();
    }
  };
  const resetGame = () => {
    setIsCross(true);
    setBoard(Array(9).fill('question'));
    setWinner('');
    setTouchedCells(Array(9).fill(false));
    setLastTouchedCell(null);
    resetAnimation();
  };
  const winGame = currentBoard => {
    if (
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[1] &&
      currentBoard[1] === currentBoard[2]
    ) {
      // setWinner(board[0]);
      return currentBoard[0];
    } else if (
      currentBoard[3] !== 'question' &&
      currentBoard[3] === currentBoard[4] &&
      currentBoard[4] === currentBoard[5]
    ) {
      // setWinner(board[3]);
      return currentBoard[3];
    } else if (
      currentBoard[6] !== 'question' &&
      currentBoard[6] === currentBoard[7] &&
      currentBoard[7] === currentBoard[8]
    ) {
      // setWinner(board[6]);
      return currentBoard[6];
    } else if (
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[3] &&
      currentBoard[3] === currentBoard[6]
    ) {
      // setWinner(board[0]);
      return currentBoard[0];
    } else if (
      currentBoard[1] !== 'question' &&
      currentBoard[1] === currentBoard[4] &&
      currentBoard[4] === currentBoard[7]
    ) {
      // setWinner(board[1]);
      return currentBoard[1];
    } else if (
      currentBoard[2] !== 'question' &&
      currentBoard[2] === currentBoard[5] &&
      currentBoard[5] === currentBoard[8]
    ) {
      // setWinner(board[2]);
      return currentBoard[2];
    } else if (
      currentBoard[0] !== 'question' &&
      currentBoard[0] === currentBoard[4] &&
      currentBoard[4] === currentBoard[8]
    ) {
      // setWinner(board[0]);
      return currentBoard[0];
    } else if (
      currentBoard[2] !== 'question' &&
      currentBoard[2] === currentBoard[4] &&
      currentBoard[4] === currentBoard[6]
    ) {
      // setWinner([2]);
      return currentBoard[2];
    } else {
      //console.log('No Winner Yet');
      return '';
    }
  };
  const chooseItemColor = (row, col) => {
    const index = row * 3 + col;
    const borderColor = getBorderColor(row, col);
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
  const getBorderColor = (row, col) => {
    const index = row * 3 + col;
    if (touchedCells[index]) {
      return borderColors[index % borderColors.length];
    } else {
      return '#BEBEBE';
    }
  };
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
  const triggerAnimation = () => {
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={45} color="#C7EEFF" />
        </Pressable>

        <Text style={styles.headerText}>Tic Tac Toe</Text>
      </View>
      <Animated.View style={[styles.main, {opacity: fadeInAnim}]}>
        <Animated.Image
          source={require('../assets/images/img1.png')}
          style={[
            styles.image,
            {transform: [{scale: bounceAnim}, {translateY: imageAnim}]},
          ]}
        />
      </Animated.View>
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={[
                  styles.cell,
                  {
                    borderColor: getBorderColor(row, col),
                    backgroundColor: chooseItemColor(row, col),
                  },
                ]}
                onPress={() => drawItem(row, col)}
                disabled={board[row * 3 + col] !== 'question'}>
                {board[row * 3 + col] === 'cross' && (
                  <Entypo name="cross" size={cellSize / 2} color="#FF3333" />
                )}
                {board[row * 3 + col] === 'circle' && (
                  <Entypo name="circle" size={cellSize / 2} color="#008200" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <ModalView
        visible={modalVisible}
        onCloseModal={() => {
          setModalVisible(false);
          resetGame();
        }}>
        <Text style={styles.modalText}>{modalContent}</Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setModalVisible(false);
            resetGame();
          }}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </ModalView>
    </View>
  );
};
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
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
  },
  board: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: width / 4,
    height: width / 4,
    borderWidth: 2,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
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
    paddingVertical: 3,
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
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 58,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
export default MultiPlayer;
