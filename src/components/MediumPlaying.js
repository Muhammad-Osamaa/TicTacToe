import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const MediumPlaying = () => {
  const navigation = useNavigation();
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const {width, height} = Dimensions.get('window');
  useEffect(() => {
    if (!isCross) {
      // AI makes a move
      makeAIMove();
    }
  }, [isCross]);

  const makeAIMove = () => {
    const availableMoves = board.reduce((acc, cell, index) => {
      if (cell === 'question') {
        acc.push(index);
      }
      return acc;
    }, []);

    if (availableMoves.length > 0) {
      // Implement your medium difficulty logic here
      // For simplicity, let's choose a random move for the medium difficulty
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const aiMove = availableMoves[randomIndex];

      setTimeout(() => {
        const newBoard = [...board];
        newBoard[aiMove] = 'circle';

        const winningPlayer = winGame(newBoard);
        // if (winningPlayer !== '') {
        if (winningPlayer) {
          setWinner(winningPlayer);
          showAlert(winningPlayer + ' Won The Game');
        } else if (!newBoard.includes('question')) {
          showAlert('The game is drawn');
        } else {
          setIsCross(true);
          setBoard(newBoard);
        }
      }, 500); // Delay AI move for a better user experience
    }
  };

  const drawItem = (row, col) => {
    const index = row * 3 + col;
    if (board[index] === 'question' && !winner) {
      const newBoard = [...board];
      newBoard[index] = 'cross';

      const winningPlayer = winGame(newBoard);
      if (winningPlayer) {
        setWinner(winningPlayer);
        showAlert(winningPlayer + ' Won The Game');
      } else if (!newBoard.includes('question')) {
        showAlert('The game is drawn');
      } else {
        setIsCross(false);
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
    const winPatterns = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],

      [0, 2, 4],
      [1, 5, 8],
      [0, 6, 7],

      [0, 5, 7],
      [1, 3, 8],
      [4, 6, 2],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] !== 'question' &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[b] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return currentBoard[a];
      }
    }

    if (!currentBoard.includes('question')) {
      showAlert('The game is drawn');
    }

    return '';
  };
  const showAlert = message => {
    Alert.alert(
      message,
      '',
      [
        {
          text: 'OK',
          onPress: () => resetGame(),
        },
      ],
      {backgroundColor: '#2B2B52', color: '#FFFFF'},
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={{color: '#C7EEFF', fontSize: 30, padding: 30, marginTop: 5}}>
        Medium Mode
      </Text>
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={{flexDirection: 'row'}}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={{
                  width: width/3.5,
                  height: height/7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                }}
                onPress={() => drawItem(row, col)}
                disabled={board[row * 3 + col] !== 'question'}>
                {board[row * 3 + col] === 'question' ? (
                  <Text style={{fontSize: 50, color: '#C7EEFF'}} />
                ) : (
                  <Entypo
                    name={board[row * 3 + col]}
                    size={50}
                    color={
                      board[row * 3 + col] === 'cross' ? '#FF3031' : '#45CE30'
                    }
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MediumPlaying;
