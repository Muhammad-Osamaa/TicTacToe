import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const EasyPlaying = () => {
  const navigation = useNavigation();
  const [board, setBoard] = useState(Array(9).fill('question'));
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [fadeInAnim] = useState(new Animated.Value(0));
  const [bounceAnim] = useState(new Animated.Value(0.8));
  const [imageAnim] = useState(new Animated.Value(0));
  const {width, height} = Dimensions.get('screen');

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
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const aiMove = availableMoves[randomIndex];

      setTimeout(() => {
        const newBoard = [...board];
        newBoard[aiMove] = 'circle';

        const winningPlayer = winGame(newBoard);
        if (winningPlayer !== '') {
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
  const resetAnimation = () => {
    imageAnim.setValue(0);
  };
  const drawItem = (row, col) => {
    const index = row * 3 + col;
    if (board[index] === 'question' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = 'cross';

      const winningPlayer = winGame(newBoard);
      if (winningPlayer !== '') {
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
      <View style={styles.mainContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Entypo name="chevron-left" size={45} color="#C7EEFF" />
        </Pressable>
        <Text style={styles.headerText}>Easy Mode</Text>
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
      <View style={styles.board}>
        {[0, 1, 2].map(row => (
          <View key={row} style={{flexDirection: 'row'}}>
            {[0, 1, 2].map(col => (
              <TouchableOpacity
                key={col}
                style={{
                  width: width / 3.5,
                  height: height / 7,
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
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default EasyPlaying;
