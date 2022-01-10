import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { StatusBar } from 'expo-status-bar';

//images
import Pokedex from '../images/Pokedex.png'
import TBLogo from '../images/TeamBuilderLogo.png'

const StartScreen = ({ navigation }) => {

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(10)
  }

  function openNewTeam(){

    onPressButton()
    navigation.push('ProfessorIntro')

  }

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
