/**
 * @fileoverview Game component used to select what game the user wants to make a team for.
 */

import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

/**
 * @param {Image}     logoImg - Game image logo
 * @param {Function}  onPress - Function for selecting the current component
 * @param {String}    game - Pokemon game i.e. Red, Blue, Yellow
 * @param {String}    selectedGame - The currently selected game
 *  
 * @returns 
 */
const SelectGameComponent = ({ logoImg, onPress, game, selectedGame }) => {

  /**
   * @summary Plays a "select" sound effect
   * 
   * @description  This function is used to play a sound effect that is used in the pokemon games when a menu option is selected,
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

  return (

    <SelectGameTouchable onPress={() => {onPressButton(); onPress(game);}} underlayColor={'transparent'} activeOpacity={1} style={{borderColor: selectedGame == game ? "#a3cede":"transparent", borderWidth:3, borderRadius:10}}>

      <SelectGameLogo source={logoImg}/>

    </SelectGameTouchable>

  );
}

const SelectGameTouchable = styled.TouchableHighlight`

  width: 90%;
  height:145px;
  display: flex;
  align-items: center;
  justify-content:center;
  margin-left:5%;
  margin-bottom:5px;

`;

const SelectGameLogo = styled.Image`

  width:100%;
  height:100%;
  border-radius:10px;

`

export default SelectGameComponent;
