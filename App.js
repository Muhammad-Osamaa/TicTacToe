import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TicTacToe from './src/Screens/TicTacToe';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TicTacToe">
        <Stack.Screen name="TicTacToe" component={TicTacToe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
