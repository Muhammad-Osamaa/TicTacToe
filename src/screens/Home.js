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
              <Entypo name="user" size={30} color="#4C0033" />
              <Text style={styles.buttonText}>VS</Text>
              <Entypo name="user" size={30} color="#4C0033" />
            </View>
          </AnimatedTouchableOpacity>
          <View style={styles.buttonSpacer} />
          <AnimatedTouchableOpacity
            style={[styles.button, styles.buttonWrapper, ringScale]}
            onPress={() => {
              handleShowModal();
              startRingAnimation();
              navigation.navigate('SinglePlayer', {
                difficultyLevel: selectedDifficulty,
              });
            }}>
            <View style={styles.buttonContent}>
              <Entypo name="user" size={30} color="#4C0033" />
              <Text style={styles.buttonText}>VS</Text>
              <Foundation name="laptop" size={30} color="#4C0033" />
            </View>
          </AnimatedTouchableOpacity>
        </View>
        <View style={styles.buttonSpacer} />
        <AnimatedTouchableOpacity
          style={[styles.button, ringScale]}
          onPress={handleExit}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="exit-to-app" size={30} color="#4C0033" />
            <Text style={styles.buttonText}>Exit</Text>
          </View>
        </AnimatedTouchableOpacity>
      </View>
      <ModalView 
        visible={isModalVisible} 
        onCloseModal={handleCloseModal}
        onSelectedDifficulty={(difficulty) => setSelectedDifficulty(difficulty)} />
    </View>
  );
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#4C0033',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerText: {
    fontSize: 48,
    color: '#F73D93',
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
  },
  button: {
    minWidth: 150,
    minHeight: 40,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#FF3FA4',
    borderColor: '#F5B5FC',
    shadowColor: '#FF3FA4',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.64,
    shadowRadius: 20,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Nunito',
    fontSize: 22,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    fontWeight: '700',
    color: '#313133',
  },
});

export default Home;
