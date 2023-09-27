import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const DifficultyLevel = ({onSelectDifficulty}) => {
  const [localDifficulty, setLocalDifficulty] = useState('easy');

  const handleDifficultyChange = value => {
    setLocalDifficulty(value);
  };
  const handleOkPress = () => {
    onSelectDifficulty(localDifficulty);
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
          localDifficulty === 'easy' ? 0 : localDifficulty === 'medium' ? 1 : 2
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            {backgroundColor: localDifficulty === 'easy' ? 'green' : 'gray'},
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
      <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
        <Text style={{color: '#FFFFFF'}}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10316B',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    color: 'red',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  thumbStyle: {
    width: 30,
    height: 80,
    backgroundColor: '#6ED4E8',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  difficultyButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    flex: 1,
    marginHorizontal: 5,
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
