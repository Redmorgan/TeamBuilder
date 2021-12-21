import React, { useState } from "react";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


const SelectGameComponent = ({ logoImg, onPress, game, selectedGame }) => {

    async function onPressSound(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
      }

  return (

    <SelectGameTouchable onPress={() => {onPressSound(); onPress(game);}} underlayColor={'transparent'} activeOpacity={1} style={{borderColor: selectedGame == game ? "#a3cede":"transparent", borderWidth:3, borderRadius:10}}>

      <SelectGameLogo source={logoImg}/>

    </SelectGameTouchable>

  );
}

const SelectGameTouchable = styled.TouchableHighlight`
  width: 90%;
  height:135px
  display: flex;
  align-items: center;
  justify-content:center;
  margin-left:5%
  margin-bottom:5px
`;

const SelectGameLogo = styled.Image`
    width:100%
    height:100%
    border-radius:10px

`

export default SelectGameComponent;
