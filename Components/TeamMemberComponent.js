/**
 * @fileoverview Component for displaying a pokemon that is part of one of the users teams.
 */

 import React, { useState } from "react";
import styled from "styled-components/native";
import { Vibration } from "react-native";
import { Audio } from 'expo-av'

// Images
import DeleteIcon from '../images/deleteIcon.png'

// Components
import WeaknessModalComponent from "./WeaknessModal";

/**
 * @param {Function}  removeFromTeam - Function for removing the selected pokemon from the team.
 * @param {Object}    pokemon - Object data for the selected pokemon.
 * @param {Boolean}   readOnly - Boolean for checking if the pokemon can be removed from the team or not.
 * @param {Integer}   index - Index position of the pokemon in the team.
 *  
 * @returns A component contaiing the sprite of the pokemon as well as its name.
 */
const TeamMemberComponent = ({ removeFromTeam, pokemon, readOnly, index }) => {

  const[weaknessState, setWeaknessState] = useState(false)

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
   * @summary Opens the pokemon weakness modal.
   * 
   * @description Opens a modal containing all the weaknesses of the pokemon that was selected.
   */
  function openWeaknessModal(){

    onPressButton()

    setWeaknessState(true)

  }


  return (

    <TeamMemberContainer>

      <WeaknessModalComponent state={weaknessState} types={pokemon.types} name={pokemon.name} closeWeaknessModal={setWeaknessState}/>

      {(readOnly == false)?
      <RemovePokemonTouchable onPress={() => {removeFromTeam(index)}} underlayColor={'transparent'} activeOpacity={1}>

        <RemovePokemonImage source={DeleteIcon}/>

      </RemovePokemonTouchable>:null}

      {(readOnly == false)?
      <TouchablePokemonSprite onPress={()=>{openWeaknessModal()}} underlayColor={'transparent'} activeOpacity={1}>

        <PokemonSprite resizeMode="contain" source={{uri:pokemon.spriteURL}}/>
        
      </TouchablePokemonSprite>:

      <PokemonSprite resizeMode="contain" source={{uri:pokemon.spriteURL}}/>}

      <PokemonName>{pokemon.name}</PokemonName>

    </TeamMemberContainer>

  );
}


const TeamMemberContainer = styled.View`

  height:50%;
  width:33.33%;
  align-items:center;
  margin-bottom:5px;

`

const TouchablePokemonSprite = styled.TouchableHighlight`

  width:90%;
  height:90%;

`

const PokemonSprite = styled.Image`

  height:100%;
  width:100%;

`

const PokemonName = styled.Text`

  font-family:PokemonStyle;
  font-size:25px;

`

const RemovePokemonTouchable = styled.TouchableHighlight`

  width:20px;
  height:20px;
  position:absolute;
  right:0;
  z-index:10;
  top:10%;

`

const RemovePokemonImage = styled.Image`

  width:100%;
  height:100%;

`

export default TeamMemberComponent;
