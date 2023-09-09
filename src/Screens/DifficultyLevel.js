import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DifficultyLevel = ({difficultyLevel, setDifficultyLevel}) => {
  return (
    <View>
      <Text style={{color: '#FFFF', fontSize: 20}}>DifficultyLevel:</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            {backgroundColor: difficultyLevel === 'easy' ? 'green' : 'gray'},
          ]}
          onPress={() => setDifficultyLevel('easy')}>
          <Text style={{color: '#FFFFFF'}}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            {backgroundColor: difficultyLevel === 'hard' ? 'green' : 'gray'},
          ]}
          onPress={() => setDifficultyLevel('hard')}>
          <Text style={{color: '#FFFFFF'}}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  difficultyButton: {
    padding: 10,
    borderRadius: 5,
  },
});
export default DifficultyLevel;
