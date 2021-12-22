import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';

// Components
import StartScreen from '../TeamBuilder/Screens/StartScreen.js'
import ProfessorIntroScreen from '../TeamBuilder/Screens/ProfessorIntroScreen.js'
import SelectGameScreen from '../TeamBuilder/Screens/SelectGameScreen.js'
import ProfessorOutroScreen from '../TeamBuilder/Screens/ProfessorOutroScreen.js'
import SelectTeamScreen from '../TeamBuilder/Screens/SelectTeamScreen.js'
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {

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

  // const [fontLoaded, setFontLoaded] = useState(false);

  // if(!fontLoaded)

  return (

    <NavigationContainer>

      <AppLoading />

      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown:false }}>

        <Stack.Screen name="Start"component={StartScreen}/>

        <Stack.Screen name="ProfessorIntro" component={ProfessorIntroScreen}/>

        <Stack.Screen name="SelectGame" component={SelectGameScreen} />

        <Stack.Screen name="ProfessorOutro" component={ProfessorOutroScreen}/>

        <Stack.Screen name="SelectTeam" component={SelectTeamScreen} />

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
