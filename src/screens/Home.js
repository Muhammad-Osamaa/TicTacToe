import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';

const Home = ({navigation}) => {
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MultiPlayer')}>
          <Text style={styles.buttonText}>Multi Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TicTacToe')}>
          <Text style={styles.buttonText}>Play With AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleExit}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#790252',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: '#F73D93',
    borderWidth: 2,
    width: '70%',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#FF55BB',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    color: '#FFE5F1',
  },
});
export default Home;
