import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Animated,
  Easing,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalView from '../components/ModalView';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  const startRingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const ringScale = {transform: [{scale: scaleValue}]};
  const handleExit = () => {
    Alert.alert(
      'Exit App',
      'Are You Sure Want to exit the game?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
  };
  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleDifficultySelect = difficulty => {
    setSelectedDifficulty(difficulty);
    handleCloseModal();
    navigation.navigate('SinglePlayer', {
      difficultyLevel: difficulty,
    });
  };
  useEffect(() => {
    const backAction = () => {
      handleExit();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tic Tac Toe</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <AnimatedTouchableOpacity
            style={[styles.button, styles.buttonWrapper, ringScale]}
            onPress={() => {
              startRingAnimation();
              navigation.navigate('MultiPlayer');
            }}>
            <View style={styles.buttonContent}>
              <Entypo name="user" size={30} color="#C7EEFF" />
              <Text style={styles.buttonText}>VS </Text>
              <Entypo name="user" size={30} color="#C7EEFF" />
            </View>
          </AnimatedTouchableOpacity>
          <View style={styles.buttonSpacer} />
          <AnimatedTouchableOpacity
            style={[styles.button, styles.buttonWrapper, ringScale]}
            onPress={handleShowModal}>
            <View style={styles.buttonContent}>
              <Entypo name="user" size={30} color="#C7EEFF" />
              <Text style={styles.buttonText}>VS </Text>
              <Foundation name="laptop" size={30} color="#C7EEFF" />
            </View>
          </AnimatedTouchableOpacity>
        </View>
        <View style={styles.buttonSpacer} />
        <AnimatedTouchableOpacity
          style={[styles.button, ringScale]}
          onPress={handleExit}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="exit-to-app" size={30} color="#C7EEFF" />
            <Text style={styles.buttonText}>Exit</Text>
          </View>
        </AnimatedTouchableOpacity>
      </View>
      <ModalView
        visible={isModalVisible}
        onCloseModal={handleCloseModal}
        onSelectDifficulty={handleDifficultySelect}
        selectedDifficulty={selectedDifficulty}
      />
    </View>
  );
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#10316B',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerText: {
    fontSize: 48,
    color: '#C7EEFF',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacer: {
    height: 20,
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#10316B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: '#0077C0',
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    // minWidth: 40,
    // minHeight: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#C7EEFF',
    borderColor: '#0077C0',
    shadowColor: '#b3bba8',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.64,
    shadowRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Nunito',
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    fontWeight: '600',
    color: '#C7EEFF',
  },
});

export default Home;
