import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


const SelectPokemonComponent = () => {

    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)
      }

  return (

    <SelectPokemonTouchable onPress={() => {onPressButton()}} underlayColor={'transparent'} activeOpacity={1}>

      <SelectPokemonWrapper>

        <PokemonNameLabel>Fletchinder</PokemonNameLabel>

        <PokemonTypesContainer>

          <PokemonType/>

          <PokemonType style = {{marginLeft:5}}/>

        </PokemonTypesContainer>

        <AddPokemonTouchable>

          <AddPokemonIcon/>

        </AddPokemonTouchable>

      </SelectPokemonWrapper>

    </SelectPokemonTouchable>

  );
}

const SelectPokemonTouchable = styled.TouchableHighlight`

  width: 97.5%;
  height:80px
  border: 3px solid #000000
  border-top-left-radius:20px
  border-bottom-left-radius:20px
  border-top-right-radius:90px
  border-bottom-right-radius:90px

`;

const SelectPokemonWrapper = styled.View`

  width:100%
  height:100%
  display: flex;
  align-items: center;
  flex-direction:row

`

const PokemonTypesContainer = styled.View`

  width:105px
  height:50px
  display: flex;
  flex-direction:row
  margin-left:10px

`

const PokemonNameLabel = styled.Text`

  font-size:45px
  font-family:PokemonStyle
  margin-left:10px

`

const PokemonType = styled.Image`

  height:50px
  width:50px
  border-radius:90px
  background-color:black

`

const AddPokemonTouchable = styled.TouchableHighlight`

  width:50px
  height:50px
  border-radius:90px
  background-color:pink
  position:absolute
  right:15px

`

const AddPokemonIcon = styled.Image`

  width:100%
  height:100%

`

export default SelectPokemonComponent;
