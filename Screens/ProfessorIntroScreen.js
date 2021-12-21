import React, { useEffect, useState } from "react";
import { Button, Text, Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

//images
import SelectBackground from '../images/SelectBackground.png'
import Oak from '../images/Oak.png'
import TextBoxImage from '../images/TextBox.png'

const GameSelectScreen = ({ navigation: { navigate } }) => {

  useEffect(()=>{

    async function playBackgroundMusic(){
      const { sound } = await Audio.Sound.createAsync(
        require('../audio/professorMusic.mp3')
      );
      //await sound.playAsync()
    }

    playBackgroundMusic()

  }, [])



  async function onPressSound(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
  }

  const [profText1, closeProfText1] = useState(true);
  const [profText2, closeProfText2] = useState(false);

  function nextText(){

    if(profText1 == true){

      onPressSound()
      closeProfText1(false)
      closeProfText2(true)

    }else if(profText2 == true){

      onPressSound()
      navigate('SelectTeam')

    }

  }


  return (

		<MainView>

      <Background source={SelectBackground}> 

        <OakImage source={Oak}></OakImage>

        <TextBoxTouchable onPress={() => {nextText();}} underlayColor={'transparent'} activeOpacity={1}>

          <TextBoxWrapper>

            {(profText1)?<TextBoxText>Welcome to the world of Pokémon!</TextBoxText>:null}

            {(profText2)?<TextBoxText>What region will you be travelling to for your adventure?</TextBoxText>:null}

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
  font-size:30px

`

export default GameSelectScreen;
