import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const DifficultyLevel = ({difficultyLevel, setDifficultyLevel}) => {
  const [localDifficulty, setLocalDifficulty] = useState('easy');
  const handleDifficultyChange = value => {
    setLocalDifficulty(value);
    setDifficultyLevel(value);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Difficulty Level</Text>

      {/* Emoji */}
      <Text style={styles.emoji}>😊</Text>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        minimumTrackTintColor="#6ED4E8"
        thumbTintColor="#6ED4E8"
        thumbStyle={styles.thumbStyle}
        trackStyle={{height: 10}}
        value={
          difficultyLevel === 'easy' ? 0 : difficultyLevel === 'medium' ? 1 : 2
        }
        onValueChange={value => {
          if (value === 0) {
            handleDifficultyChange('easy');
          } else if (value === 1) {
            handleDifficultyChange('medium');
          } else {
            handleDifficultyChange('hard');
          }
        }}
      />

      {/* Difficulty Buttons */}
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
          onPress={() => handleDifficultyChange('easy')}>
          <Text style={{color: '#FFFFFF'}}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            {backgroundColor: localDifficulty === 'medium' ? 'green' : 'gray'},
          ]}
          onPress={() => handleDifficultyChange('medium')}>
          <Text style={{color: '#FFFFFF'}}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            {backgroundColor: localDifficulty === 'hard' ? 'green' : 'gray'},
          ]}
          onPress={() => handleDifficultyChange('hard')}>
          <Text style={{color: '#FFFFFF'}}>Hard</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.okButton}>
        <Text style={{color: '#FFFFFF'}}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  difficultyButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    color: '#FDE5EC',
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    color: 'red'
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  thumbStyle:{
    width: 30,
    height: 80,
    backgroundColor: '#6ED4E8',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  okButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default DifficultyLevel;
