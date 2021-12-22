import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


//images
import SelectBackground from '../images/SelectBackground.png'
import Oak from '../images/Oak.png'
import TextBoxImage from '../images/TextBox.png'

const ProfessorOutroScreen = ({ route, navigation }) => {

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }

  function gotoSelectTeam(){

    onPressButton()
    navigation.push('SelectTeam')

  }

  var gameVersion = route.params.selectedGame

  var gameName;

  if(gameVersion == "red" || gameVersion == "blue" || gameVersion == "yellow"){

    gameName = "Kanto"

  }else if(gameVersion == "gold" || gameVersion == "silver" || gameVersion == "crystal"){

    gameName = "Johto"

  }else if(gameVersion == "ruby" || gameVersion == "sapphire" || gameVersion == "emerald"){

    gameName = "Hoenn"

  }else if(gameVersion == "pearl" || gameVersion == "diamond" || gameVersion == "platinum"){

    gameName = "Sinnoh"

  }else if(gameVersion == "black" || gameVersion == "white"){

    gameName = "Unova"

  }

  return (

    <MainView>

      <Background source={SelectBackground}> 

        <OakImage source={Oak}></OakImage>

        <TextBoxTouchable underlayColor={'transparent'} activeOpacity={1} onPress={()=>{gotoSelectTeam()}}>

          <TextBoxWrapper>

          <TextBoxText style={{fontFamily:'PokemonStyle'}}>Oh, the {gameName} region! I hope you have a wonderful time!</TextBoxText>

            <TextBoxBackground source={TextBoxImage} resizeMode="stretch"/>

          </TextBoxWrapper>

        </TextBoxTouchable>

      </Background>
      
    </MainView>

  );
}

const MainView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Background = styled.ImageBackground`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
`

const OakImage = styled.Image`

  width:310px;
  height:583px;
  margin-top:5%;

`

const TextBoxTouchable = styled.TouchableHighlight`
  width:90%;
  height:20%;
  margin-top: 10px;
`

const TextBoxWrapper = styled.View`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content:center;

`

const TextBoxBackground = styled.Image`
  width:100%;
  height:100%;

`

const TextBoxText = styled.Text`
  width:90%;
  height:80%;
  position:absolute;
  z-index:2;
  font-size:40px

`

export default ProfessorOutroScreen;
