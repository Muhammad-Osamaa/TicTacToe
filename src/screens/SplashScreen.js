import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Animated, Easing} from 'react-native';

const SplashScreen = ({navigation}) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const delay = 2000;

    Animated.parallel([
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.elastic(2),
      }),
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, fadeInAnim, scaleAnim, rotateAnim]);

  const rotateStyle = {
    transform: [
      {scale: scaleAnim},
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.main, {opacity: fadeInAnim}, rotateStyle]}>
        <Image
          source={require('../assets/images/img1.png')}
          style={styles.image}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#10316B',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 500,
  },
  text: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FAF3F0',
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
