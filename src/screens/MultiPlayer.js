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

  useEffect(() => {
    if (winner !== '') {
      showAlert(`${winner} WOn the Game`, '', '#2B2B52');
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
    }
  };
  const resetGame = () => {
    setIsCross(true);
    setBoard(Array(9).fill('question'));
    setWinner('');
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
    if (board[index] === 'cross') return '#FF3031';
    else if (board[index] === 'circle') return '#45CE30';
    return '#74B9FF';
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={{position: 'absolute', top: 10, left: 10}}
        onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={styles.headerText}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={[
                  styles.cell,
                  {
                    borderRightWidth: col !== 2 ? 2 : 0,
                    borderBottomWidth: row !== 2 ? 2 : 0,
                  },
                ]}
                onPress={() => drawItem(row, col)}
                disabled={board[row * 3 + col] !== 'question'}>
                {board[row * 3 + col] === 'question' ? (
                  <Text
                    style={{
                      fontSize: cellSize / 2,
                      color: chooseItemColor(row, col),
                    }}
                  />
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
    backgroundColor: '#10316B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#C7EEFF',
    fontSize: 30,
    padding: 30,
    marginTop: 5,
  },
  board: {
    borderWidth: 2,
    borderColor: '#C7EEFF',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: width / 3.5,
    height: width / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C7EEFF',
  },
});
export default MultiPlayer;
