import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from '../TeamBuilder/Screens/StartScreen.js'
import ProfessorIntroScreen from './Screens/ProfessorIntroScreen.js'
import SelectGameScreen from '../TeamBuilder/Screens/SelectGameScreen.js'
import SelectTeamScreen from '../TeamBuilder/Screens/SelectTeamScreen.js'


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown:false }}>

        <Stack.Screen name="Start"component={StartScreen}/>

        <Stack.Screen name="ProfessorIntro" component={ProfessorIntroScreen} />

        <Stack.Screen name="SelectGame" component={SelectGameScreen} />

        <Stack.Screen name="SelectTeam" component={SelectTeamScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
