import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const EasyPlaying = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}>
        <Entypo name="chevron-left" size={30} color="#C7EEFF" />
      </Pressable>
      <Text style={{color: '#C7EEFF', fontSize: 30, padding: 30, marginTop: 5}}>
        Easy Mode
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10316B',
    // borderRadius: 10,
    // borderTopLeftRadiusorder: 0,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default EasyPlaying;
