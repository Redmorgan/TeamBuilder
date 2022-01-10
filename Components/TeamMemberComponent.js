/**
 * @fileoverview Component for displaying a pokemon that is part of one of the users teams.
 */

import React from "react";
import styled from "styled-components/native";

// Immages
import DeleteIcon from '../images/deleteIcon.png'

/**
 * @param {Function}  removeFromTeam - Function for removing the selected pokemon from the team.
 * @param {Object}    pokemon - Object data for the selected pokemon.
 * @param {Boolean}   readOnly - Boolean for checking if the pokemon can be removed from the team or not.
 * @param {Integer}   index - Index position of the pokemon in the team.
 *  
 * @returns A component contaiing the sprite of the pokemon as well as its name.
 */
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
