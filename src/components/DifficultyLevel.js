import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const DifficultyLevel = ({onSelectDifficulty, selectedDifficulty}) => {
  const [localDifficulty, setLocalDifficulty] = useState('Easy');
  const [textColor, setTextColor] = useState('#C7EEFF');
  const navigation = useNavigation();
  useEffect(() => {
    setLocalDifficulty(selectedDifficulty || 'Easy');
  }, [selectedDifficulty]);
  const handleDifficultyChange = value => {
    setLocalDifficulty(value === 0 ? 'Easy' : value === 1 ? 'Medium' : 'Hard');
  };
  const handleOkPress = () => {
    switch (localDifficulty) {
      case 'Easy':
        navigation.replace('EasyPlaying');
        break;
      case 'Medium':
        navigation.replace('MediumPlaying');
        break;
      case 'Hard':
        navigation.replace('HardPlaying');
        break;
      default:
        break;
    }
  };
  const emojiColor =
    localDifficulty === 'Easy'
      ? '#C7EEFF'
      : localDifficulty === 'Medium'
      ? '#fffc5c'
      : '#FF4500';
  const emojiName =
    localDifficulty == 'Easy'
      ? 'emoji-happy'
      : localDifficulty == 'Medium'
      ? 'emoji-flirt'
      : 'emoji-neutral';
  return (
    <View style={styles.container}>
      <Text style={[styles.header, {color: emojiColor}]}>Difficulty Level</Text>

      <Entypo
        name={emojiName}
        size={90}
        color={emojiColor}
        style={styles.emoji}
      />
      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={2}
        step={1}
        minimumTrackTintColor={emojiColor}
        thumbTintColor={emojiColor}
        thumbStyle={styles.thumbStyle}
        trackStyle={styles.customTrackStyle}
        thumbProps={{children: <View />}}
        value={
          localDifficulty === 'Easy' ? 0 : localDifficulty === 'Medium' ? 1 : 2
        }
        onValueChange={handleDifficultyChange}
      />
      <Text
        style={[
          styles.difficultyText,
          {
            color: emojiColor,
          },
        ]}>
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    top: -25,
  },
  slider: {
    width: '75%',
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
  customTrackStyle: {
    height: 40,
    borderRadius: 20,
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
    overflow: 'visible',
  },
  button: {
    backgroundColor: '#279EFF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#C7EEFF',
    paddingHorizontal: 2,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  buttonText: {
    backgroundColor: '#10316B',
    color: '#C7EEFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
export default DifficultyLevel;
