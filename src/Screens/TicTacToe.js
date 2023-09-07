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

const {width, height} = Dimensions.get('window');

const TicTacToe = () => {
  const cellSize = Math.min(width, height) / 6;
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (winner !== '') {
      Alert.alert(winner + ' Won The Game');
    }
  }, [winner]);
  const drawItem = (row, col) => {
    console.log('drawItem function called');
    const index = row * 3 + col;
    if (board[index] === 'question' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = isCross ? 'cross' : 'circle';
      setBoard(newBoard);

      const winningPlayer = winGame(newBoard);
      if (winningPlayer !== '') {
        console.log(winningPlayer + 'Won The Game');
        setWinner(winningPlayer);
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
      console.log('Player' + board[0] + 'won');
      return board[0];
    } else if (
      board[3] !== 'question' &&
      board[3] === board[4] &&
      board[4] === board[5]
    ) {
      return board[3];
    } else if (
      board[6] !== 'question' &&
      board[6] === board[7] &&
      board[7] === board[8]
    ) {
      return board[6];
    } else if (
      board[0] !== 'question' &&
      board[0] === board[3] &&
      board[3] === board[6]
    ) {
      return board[0];
    } else if (
      board[1] !== 'question' &&
      board[1] === board[4] &&
      board[4] === board[7]
    ) {
      return board[1];
    } else if (
      board[2] !== 'question' &&
      board[2] === board[5] &&
      board[5] === board[8]
    ) {
      return board[2];
    } else if (
      board[0] !== 'question' &&
      board[0] === board[4] &&
      board[4] === board[8]
    ) {
      return board[0];
    } else if (
      board[2] !== 'question' &&
      board[2] === board[4] &&
      board[4] === board[6]
    ) {
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
  useEffect(() => {
    if (winner !== '') {
      Alert.alert(winner + 'Won The Game');
    }
  }, [winner]);

  return (
    <View style={styles.container}>
      <Text style={{color: '#01CBC6', fontSize: 30}}>Tic Tac Toe</Text>

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
                onPress={() => drawItem(row, col)}>
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
          width: 150,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={resetGame}>
        <MaterialCommunityIcons
          name="restart-alert"
          size={24}
          color="#2B2B52"
        />
        <Text style={{color: '#2B2B52', fontSize: 16}}>Restart Game</Text>
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
