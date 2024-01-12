import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

function Square({value, onPress}) {
  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
}

function Board({squares, onPress}) {
  return (
    <View style={styles.board}>
      {[0, 1, 2].map(row => (
        <View key={row} style={{flexDirection: 'row'}}>
          {[0, 1, 2].map(col => (
            <TouchableOpacity
              key={col}
              style={{backgroundColor: 'red'}}></TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function HardPlaying() {
  const navigation = useNavigation();
  const [board, setBoard] = useState(Array(9).fill(null));

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
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return false;
      }
    }
    return true;
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
      showAlert(`${winner} Won The Game`);
    } else if (isBoardFilled(newBoard)) {
      showAlert("It's a Tie!");
    } else {
      const bestSquare = findBestSquare(newBoard, 'O');

      if (bestSquare !== -1) {
        newBoard[bestSquare] = 'O';
        setBoard(newBoard);

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
          showAlert(`${newWinner} Won The Game`);
        } else if (isBoardFilled(newBoard)) {
          showAlert("It's a Tie!");
        }
      }
    }
  };

  const showAlert = message => {
    Alert.alert(
      message,
      '',
      [
        {
          text: 'OK',
        },
      ],
      {backgroundColor: '#2B2B52', color: '#FFFFF'},
    );
  };
  const handleBackButton = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={handleBackButton}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={{color: '#C7EEFF', fontSize: 30, padding: 30, marginTop: 5}}>
        Hard Mode
      </Text>
      <Board squares={board} onPress={i => makeMove(i)} />
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
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#2B2B52',
  },
  squareText: {
    fontSize: 50,
    color: '#C7EEFF',
  },
});
