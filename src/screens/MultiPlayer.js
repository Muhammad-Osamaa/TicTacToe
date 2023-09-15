import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const MultiPlayer = () => {
  const navigation = useNavigation();
  const cellSize = Math.min(width, height) / 3.5;
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const drawItem = (row, col) => {
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
        <Entypo name="chevron-left" size={30} color="#F73D93" />
      </Pressable>
      <Text style={{color: '#F73D93', fontSize: 30, padding: 30, marginTop: 5}}>
        Tic Tac Toe
      </Text>
      <View style={styles.board}>
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
                }}
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
});
export default MultiPlayer;
