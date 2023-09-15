import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Board = ({board, drawItem, cellSize}) => {
  const chooseItemColor = (row, col) => {
    const index = row * 3 + col;
    if (board[index] === 'cross') return '#FF3031';
    else if (board[index] === 'circle') return '#45CE30';
    return '#74B9FF';
  };

  return (
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
  );
};

const styles = StyleSheet.create({});

export default Board;
