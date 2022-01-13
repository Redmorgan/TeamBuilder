/**
 * @fileoverview Screen for displaying the intro of the professors speech.
 */

import React, { useEffect, useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

// Images
import SelectBackground from '../images/SelectBackground.png'
import BackImage from '../images/BackArrow.png'
import Oak from '../images/Oak.png'
import TextBoxImage from '../images/TextBox.png'
import BobberGif from '../images/Bobber.gif'

/**
 * @param {Function} navigation - Passed through navigation function for navigation between stacks.
 *  
 * @returns Intro screen for the professors speech. 
 */
const ProfessorIntroScreen = ( { navigation }) => {

  const [musicStatus, setMusicStatus] = useState(true)
  const [sound, setSound] = useState(new Audio.Sound())
  const [profText, nextProfText] = useState(1)


  /**
   * Loads and plays the professor background music as well as storing the sound object in a global so that it can be unloaded
   * later on. This is much easier than passing it all the way through as a prop.
   */
  useEffect(()=>{
    (async () => {
      if (musicStatus) {
          await sound.loadAsync(require('../audio/professorMusic.mp3'))

          global.backgroundMusic = sound
          
          try {
            await sound.playAsync()
          } catch (error) {
            console.log(error, "Error playing professor music.")
          }
      }else {
        await sound.stopAsync()
        await sound.unloadAsync()
      }
    })()
  },[musicStatus])

  /**
   * @summary Plays a "select" sound effect
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
    Vibration.vibrate(5)
  }

  /**
   * @summary Takes the user to the next professor speech box
   * 
   * @description When the user presses the speech box it will go onto the next string of text for the user to read, once it reaches the last text
   * box the next press will take the user to the SelectGameScreen to select a game to make a team for.
   */
  function nextText(){

    if(profText == 1){

      onPressButton()
      nextProfText(2)

    }else if(profText == 2){

      onPressButton()
      navigation.push('SelectGame')

    }

  }

  /**
   * @summary Takes the user back to the previous screen
   * 
   * @description This function runs when the user presses the previous page button. It will take the user back to the previous level of the stack.
   * It also cancels the professor music as it should not play when the user is on the home screen.
   */
  async function previousScreen(){

    setMusicStatus(false)
    await onPressButton()
    navigation.goBack()

  }

  return (

		<MainView>

      <Background source={SelectBackground}> 

      <BackArrowButton underlayColor={'transparent'} activeOpacity={1} onPress={()=>{previousScreen()}}>

        <BackArrowImage source={BackImage}/>

      </BackArrowButton>

        <OakImage source={Oak}></OakImage>

        <TextBoxTouchable onPress={() => {nextText();}} underlayColor={'transparent'} activeOpacity={1}>

          <TextBoxWrapper>

            {(profText == 1)?<TextBoxText style={{fontFamily:'PokemonStyle'}}>Welcome to the world of Pokémon!</TextBoxText>:null}

            {(profText == 2)?<TextBoxText style={{fontFamily:'PokemonStyle'}}>What region will you be travelling to for your adventure?</TextBoxText>:null}

            <Bobber source={BobberGif}/>

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

const BackArrowButton = styled.TouchableHighlight`

  width:50px;
  height:50px;
  position:absolute;
  z-index:4;
  top:4%;
  left:10px;

`

const BackArrowImage = styled.Image`

  width:100%;
  height:100%;

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

const Bobber = styled.Image`

  width:20px;
  height:20px;
  z-index:3;
  position:absolute;
  bottom:10px;
  right:15px;

`

export default ProfessorIntroScreen;
