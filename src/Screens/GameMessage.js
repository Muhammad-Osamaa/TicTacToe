import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GameMessage = ({winner, resetGame}) => {
  return (
    <View style={styles.container}>
      {winner ? (
        <Text style={styles.message}>{winner} Won The Game</Text>
      ) : (
        <Text style={styles.message}>It's a draw</Text>
      )}
      <Text
        style={styles.button}
        onPress={() => {
          resetGame();
        }}>
        Restart Game
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  message: {
    color: '#01CBC6',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E74292',
    color: '#2B2B52',
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
  },
});
export default GameMessage;
