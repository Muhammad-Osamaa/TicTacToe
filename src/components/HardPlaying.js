import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, BackHandler} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const HardPlaying = () => {
  const navigation = useNavigation();

  const handleHardwareBackPress = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBackPress,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={styles.text}>Hard Mode</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10316B',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  text: {
    color: '#C7EEFF',
    fontSize: 30,
    padding: 30,
    marginTop: 5,
  },
});
export default HardPlaying;
