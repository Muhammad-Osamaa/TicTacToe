import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Board from './Board';

const DifficultyLevel = ({onSelectDifficulty, selectedDifficulty}) => {
  const [localDifficulty, setLocalDifficulty] = useState('Easy');
  const [textColor, setTextColor] = useState('#C7EEFF');
  const navigation = useNavigation();
  useEffect(() => {
    setLocalDifficulty('Easy');
  }, [selectedDifficulty]);

  useEffect(() => {
    if (localDifficulty === 'Easy') {
      setTextColor('#C7EEFF');
    } else if (localDifficulty === 'Medium') {
      setTextColor('#FFBB5C');
    } else {
      setTextColor('red');
    }
  }, [localDifficulty]);

  const handleDifficultyChange = value => {
    setLocalDifficulty(value);
  };
  const handleOkPress = () => {
    navigation.navigate('Board');
  };
  const emojiColor =
    localDifficulty === 'Easy'
      ? '#C7EEFF'
      : localDifficulty === 'Medium'
      ? '#FFBB5C'
      : '#FF4500';
  const sliderTrackColor =
    localDifficulty === 'Easy'
      ? '#C7EEFF'
      : localDifficulty === 'Medium'
      ? '#FFBB5C'
      : '#FF4500';
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Difficulty Level</Text>

      <Entypo
        name="emoji-happy"
        size={70}
        color={emojiColor}
        style={styles.emoji}
      />

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        minimumTrackTintColor={sliderTrackColor}
        thumbTintColor={sliderTrackColor}
        thumbStyle={styles.thumbStyle}
        trackStyle={{height: 40}}
        value={
          localDifficulty === 'Easy' ? 0 : localDifficulty === 'Medium' ? 1 : 2
        }
        onValueChange={value => {
          if (value === 0) {
            handleDifficultyChange('Easy');
          } else if (value === 1) {
            handleDifficultyChange('Medium');
          } else {
            handleDifficultyChange('Hard');
          }
        }}
      />
      <Text style={[styles.difficultyText, {color: textColor}]}>
        {localDifficulty}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOkPress}>
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
    borderColor: 'red',
    fontSize: 'bold',
  },
  emoji: {
    marginTop: -40,
  },
  difficultyText: {
    color: '#C7EEFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#279EFF',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 10,
    bottom: -35,
  },
  button: {
    backgroundColor: '#279EFF',
    borderRadius: 12,
    borderWidth: 2,
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
