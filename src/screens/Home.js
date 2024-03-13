import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalView from '../components/ModalView';
import {useNavigation} from '@react-navigation/native';
import DifficultyLevel from '../components/DifficultyLevel';

const images = [
  require('../assets/images/img2.png'),
  require('../assets/images/img3.png'),
  require('../assets/images/img4.png'),
  require('../assets/images/img5.png'),
  require('../assets/images/img6.png'),
  require('../assets/images/img7.png'),
  require('../assets/images/img8.png'),
];
const Home = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const {width, height} = Dimensions.get('window');
  const [imageAnimation] = useState(new Animated.Value(0));
  const [buttonScaleValue] = useState(new Animated.Value(1));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const startImageAnimation = () => {
    let index = 0;
    const animate = () => {
      Animated.timing(imageAnimation, {
        toValue: index + 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          index = (index + 1) % images.length;
          setCurrentImageIndex(index);
          animate();
        }
      });
    };
    animate();
  };
  useEffect(() => {
    startImageAnimation();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const startButtonAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScaleValue, {
          toValue: 0.9,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScaleValue, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };
  useEffect(() => {
    //startImageAnimation();
    startButtonAnimation();
  }, []);
  const imageTransform = [
    {
      translateY: imageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
      }),
    },
    {
      scale: imageAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [height * 0.0015, height * 0.0013],
      }),
    },
  ];
  const buttonScale = {transform: [{scale: buttonScaleValue}]};
  const handleExit = () => {
    Alert.alert('Exit App', 'Are You Sure Want to exit the game?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };
  const handleShowModal = () => {
    setIsModalVisible(true);
    setSelectedDifficulty('Easy');
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
      <Animated.View style={[styles.main, {transform: imageTransform}]}>
        <Image
          source={images[currentImageIndex]}
          style={{
            width: width * 0.4,
            height: height * 0.3,
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonWrapper, buttonScale]}
            onPress={() => {
              startButtonAnimation();
              navigation.navigate('MultiPlayer');
            }}>
            <View style={styles.buttonContent}>
              <Entypo name="user" size={30} color="#C7EEFF" />
              <Text style={styles.buttonText}>VS </Text>
              <Entypo name="user" size={30} color="#C7EEFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.buttonSpacer} />
          <TouchableOpacity
            style={[styles.button, styles.buttonWrapper, buttonScale]}
            onPress={handleShowModal}>
            <View style={styles.buttonContent}>
              <Entypo name="user" size={30} color="#C7EEFF" />
              <Text style={styles.buttonText}>VS </Text>
              <Foundation name="laptop" size={30} color="#C7EEFF" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSpacer} />
        <TouchableOpacity
          style={[styles.button, buttonScale]}
          onPress={handleExit}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="exit-to-app" size={30} color="#C7EEFF" />
            <Text style={styles.buttonText}>Exit</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ModalView
        visible={isModalVisible}
        showCloseButton={true}
        onCloseModal={handleCloseModal}>
        <DifficultyLevel
          onSelectDifficulty={handleDifficultySelect}
          selectedDifficulty={selectedDifficulty}
        />
      </ModalView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10316B',
  },
  header: {
    alignItems: 'center',
    paddingTop: '5%',
  },
  headerText: {
    fontSize: 48,
    color: '#C7EEFF',
  },
  main: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: '5%',
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
    borderColor: '#279EFF',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: '#C7EEFF',
    borderColor: '#279EFF',
    shadowColor: '#C7EEFF',
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
