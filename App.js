/**
 * @fileoverview The top build file of the application that loads all of the navigation for the app.
 */

import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

// Components
import StartScreen from '../TeamBuilder/Screens/StartScreen.js'
import ProfessorIntroScreen from '../TeamBuilder/Screens/ProfessorIntroScreen.js'
import SelectGameScreen from '../TeamBuilder/Screens/SelectGameScreen.js'
import ProfessorOutroScreen from '../TeamBuilder/Screens/ProfessorOutroScreen.js'
import SelectTeamScreen from '../TeamBuilder/Screens/SelectTeamScreen.js'
import TeamsViewerScreen from './Screens/TeamsViewerScreen.js';

const Stack = createNativeStackNavigator();

/**
 * @summary Loads the navigation controllers needed for navigation the application, as well as setting the first load screen.
 *  
 * @returns The start screen.
 */
export default function App() {

  // Loads the pokemon style font that is used all throughout the application.
  const fetchFonts = () => {
    return Font.loadAsync({
      PokemonStyle: require('../TeamBuilder/assets/Pokemon-DPPt.ttf')
  
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (

      <AppLoading
        startAsync = {fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}/>

    );

  }

  return (

    <NavigationContainer>

      <AppLoading/>

      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown:false }}>

        <Stack.Screen name="Start"component={StartScreen}/>

        <Stack.Screen name="ProfessorIntro" component={ProfessorIntroScreen}/>

        <Stack.Screen name="SelectGame" component={SelectGameScreen} />

        <Stack.Screen name="ProfessorOutro" component={ProfessorOutroScreen}/>

        <Stack.Screen name="SelectTeam" component={SelectTeamScreen} />

        <Stack.Screen name="ViewTeams" component={TeamsViewerScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
