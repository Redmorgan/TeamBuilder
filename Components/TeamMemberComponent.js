import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';

// images
import DeleteIcon from '../images/deleteIcon.png'


const TeamMemberComponent = ({ removeFromTeam, pokemon, readOnly, index }) => {

  return (

    <TeamMemberContainer>

        {(readOnly == false)?
        <RemovePokemonTouchable onPress={() => {removeFromTeam(index)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

        </RemovePokemonTouchable>:null}

        <PokemonSprite resizeMode="contain" source={{uri:pokemon.spriteURL}}/>

        <PokemonName>{pokemon.name}</PokemonName>

    </TeamMemberContainer>

  );
}


const TeamMemberContainer = styled.View`

  height:50%
  width:33.33%
  align-items:center
  margin-bottom:5px

`

const PokemonSprite = styled.Image`

  height:90%
  width:90%

`

const PokemonName = styled.Text`

  font-family:PokemonStyle
  font-size:25px

`

const RemovePokemonTouchable = styled.TouchableHighlight`

  width:20px
  height:20px
  position:absolute
  right:0
  z-index:10
  top:10%

`

const RemovePokemonImage = styled.Image`

  width:100%
  height:100%

`

export default TeamMemberComponent;
