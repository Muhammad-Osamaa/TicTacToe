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
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const MultiPlayer = () => {
  const navigation = useNavigation();
  const cellSize = Math.min(width, height) / 3.5;
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [touchedCells, setTouchedCells] = useState(Array(9).fill(false));

  useEffect(() => {
    if (winner !== '') {
      showAlert(`${winner} Won the Game`, '', '#2B2B52');
    }
  }, [winner]);
  const showAlert = (title, message, backgroundColor) => {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'OK',
            onPress: () => resetGame(),
          },
        ],
        {
          backgroundColor: backgroundColor,
          color: '#FFFFF',
          borderRadius: 10,
        },
      );
    }, 500);
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
        showAlert('The game is drawn', '', 'red');
      } else {
        setIsCross(!isCross);
      }
      setTouchedCells(prevState => {
        const updatedCells = [...prevState];
        updatedCells[index] = true;
        return updatedCells;
      });
    }
  };
  const resetGame = () => {
    setIsCross(true);
    setBoard(Array(9).fill('question'));
    setWinner('');
    setTouchedCells(Array(9).fill(false));
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
  //   if (touchedCells[index]) {
  //     return board[index] === 'cross' ? '#FF3031' : '#45CE30';
  //   } else {
  //     return '#E4E4E4';
  //   }
  // };
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
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map(col => (
              // <View
              //   key={col}
              //   style={[
              //     styles.cell,
              //     {
              //       borderColor: getBorderColor(row, col),
              //       backgroundColor: chooseItemColor(row, col),
              //     },
              //   ]}>
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
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: width / 4,
    height: width / 4,
    borderWidth: 2,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cellContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MultiPlayer;
