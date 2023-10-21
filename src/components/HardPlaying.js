import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const HardPlaying = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={styles.text}>Medium Mode</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10316B',
    paddingVertical: 10,
    borderRadius: 10,
    borderTopLeftRadiusorder: 0,
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
