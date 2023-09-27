import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';

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

      <Entypo
        name="emoji-happy"
        size={70}
        color="#C7EEFF"
        style={styles.emoji}
      />

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        minimumTrackTintColor="#6ED4E8"
        thumbTintColor="#6ED4E8"
        thumbStyle={styles.thumbStyle}
        trackStyle={{height: 40}}
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10316B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#C7EEFF',
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
    top: -45,
    left: -5,
    position: 'relative',
  },
  slider: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
  },
  thumbStyle: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 'bold',
  },
  emoji: {
    marginTop: -40,
  },
  buttonContainer: {
    backgroundColor: '#279EFF',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#279EFF',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#C7EEFF',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  buttonText: {
    backgroundColor: '#10316B',
    color: '#C7EEFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
export default DifficultyLevel;
