import React, { useEffect, useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


//images
import SelectBackground from '../images/SelectBackground.png'
import Oak from '../images/Oak.png'
import TextBoxImage from '../images/TextBox.png'

const ProfessorIntroScreen = ( { navigation }) => {

  useEffect(()=>{

    async function playBackgroundMusic(){
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/professorMusic.mp3')
      );
      //await sound.playAsync()
    }

    playBackgroundMusic()

  }, [])

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }


  const [profText, nextProfText] = useState(1);

  function nextText(){

    if(profText == 1){

      onPressButton()
      nextProfText(2)

    }else if(profText == 2){

      onPressButton()
      navigation.push('SelectGame')

    }

  }

  return (

		<MainView>

      <Background source={SelectBackground}> 

        <OakImage source={Oak}></OakImage>

        <TextBoxTouchable onPress={() => {nextText();}} underlayColor={'transparent'} activeOpacity={1}>

          <TextBoxWrapper>

            {(profText == 1)?<TextBoxText style={{fontFamily:'PokemonStyle'}}>Welcome to the world of Pokémon!</TextBoxText>:null}

            {(profText == 2)?<TextBoxText style={{fontFamily:'PokemonStyle'}}>What region will you be travelling to for your adventure?</TextBoxText>:null}

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

export default ProfessorIntroScreen;
