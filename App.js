import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen';
import Home from './src/screens/Home';
import MultiPlayer from './src/screens/MultiPlayer';
import SinglePlayer from './src/screens/SinglePlayer';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SinglePlayer" component={SinglePlayer} />
        <Stack.Screen name="MultiPlayer" component={MultiPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
