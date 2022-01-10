/**
 * @fileoverview Start screen for the application where the user can start to build a team as well as viewing the teams they have made previously.
 */

import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { StatusBar } from 'expo-status-bar';

// Images
import Pokedex from '../images/Pokedex.png'
import TBLogo from '../images/TeamBuilderLogo.png'

/**
 * @summary Home screen where users can first interact with the app.
 * 
 * @param {Function} navigation  - Passed through navigation function for navigation between stacks. 
 *  
 * @returns Screen with pokedex background with options to create a new team and look at current teams.
 */
const StartScreen = ({ navigation }) => {

  /**
   * @summary Plays a "select" sound effect.
   * 
   * @description This function is used to play a sound effect that is used in the pokemon games when a menu option is selected,
   * it also causes the device to vibrate for 5ms as another form of touch feedback. Generally this function is triggered every
   * time an onscreen touchable item is pressed.
   */
  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(10)
  }

  /**
   * @summary Opens the new team path, taking the user to the professor intro.
   * 
   * @description When the 'New Team' button is pressed the user is taken to the professor intro where they can start to set
   * up their new team.
   */
  function openNewTeam(){

    onPressButton()
    navigation.push('ProfessorIntro')

  }

  /**
   * @summary Opens the team viewer page, where the user can look at teams they have already made.
   * 
   * @description When the 'My Teams' button is pressed the user is taken to the team viewer page where they can view and edit
   * all the teams they have previosuly made.
   */
  function openMyTeams(){

    onPressButton()
    navigation.push('ViewTeams')

  }

  return (

		<MainView>

      <StatusBar backgroundColor="transparent"/>

      <PokedexBackground source={Pokedex}>

        <TeamBuilderLogo source={TBLogo} resizeMode="contain"/>

        <NewTeamButton onPress={() => {openNewTeam()}} underlayColor={'#fad602'} activeOpacity={1}>
          
          <NewTeamText style={{fontFamily:"PokemonStyle"}}>New Team</NewTeamText>
          
        </NewTeamButton>

        <MyTeamsButton onPress={() => {openMyTeams()}} underlayColor={'#fad602'} activeOpacity={1}>

          <MyTeamsText style={{fontFamily:"PokemonStyle"}}>My Teams</MyTeamsText>

        </MyTeamsButton> 

      </PokedexBackground>

    </MainView>

  );
}

const MainView = styled.View`

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  background-color:red;

`;

const PokedexBackground = styled.ImageBackground`

  width:100%
  height:100%
  display: flex;
  align-items: center;

`

const TeamBuilderLogo = styled.Image`

  width:80%
  margin-top:35%

`

const NewTeamButton = styled.TouchableHighlight`

  width:230px
  height:60px
  background-color:#fad602
  border-radius:25px
  border: 2px solid #000000
  margin-top:10%
  display: flex;
  align-items: center;
  justify-content:center;

`

const NewTeamText = styled.Text`

  font-size:60px

`

const MyTeamsButton = styled.TouchableHighlight`

  width:230px
  height:60px
  background-color:#fad602
  border-radius:25px
  border: 2px solid #000000
  margin-top:20px
  display: flex;
  align-items: center;
  justify-content:center;

`

const MyTeamsText = styled.Text`

  font-size:60px

`

export default StartScreen;
