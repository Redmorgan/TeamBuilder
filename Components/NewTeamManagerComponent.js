import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// images
import BugType from '../images/types/Bug.png'
import DarkType from '../images/types/Dark.png'
import DragonType from '../images/types/Dragon.png'
import ElectricType from '../images/types/Electric.png'
import FairyType from '../images/types/Fighting.png'
import FightingType from '../images/types/Fighting.png'
import FireType from '../images/types/Fire.png'
import FlyingType from '../images/types/Flying.png'
import GhostType from '../images/types/Ghost.png'
import GrassType from '../images/types/Grass.png'
import GroundType from '../images/types/Ground.png'
import IceType from '../images/types/Ice.png'
import NormalType from '../images/types/Normal.png'
import PoisonType from '../images/types/Poison.png'
import PsychicType from '../images/types/Psychic.png'
import RockType from '../images/types/Rock.png'
import SteelType from '../images/types/Steel.png'
import WaterType from '../images/types/Water.png'
import pokedexIcon from '../images/pokedexIcon.png'
import pokeballsIcon from '../images/pokeballsIcon.png'

const NewTeamManagerComponent = ({ selectedTeam }) => {

  console.log(selectedTeam)

  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

      <SelectTeamHeader>

        <TeamHeaderLabel>Current Team</TeamHeaderLabel>

      </SelectTeamHeader>

      <PokemonTeamContainer>

        {(selectedTeam.length >= 1 )?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[0].spriteURL}}/>

          <PokemonName>{selectedTeam[0].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(selectedTeam.length >= 2)?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[1].spriteURL}}/>

          <PokemonName>{selectedTeam[1].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(selectedTeam.length >= 3)?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[2].spriteURL}}/>

          <PokemonName>{selectedTeam[2].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(selectedTeam.length >= 4)?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[3].spriteURL}}/>

          <PokemonName>{selectedTeam[3].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(selectedTeam.length >= 5)?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[4].spriteURL}}/>

          <PokemonName>{selectedTeam[4].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(selectedTeam.length >= 6)?
        <TeamMemberContainer>

          <PokemonSprite resizeMode="contain" source={{uri:selectedTeam[5].spriteURL}}/>

          <PokemonName>{selectedTeam[5].name}</PokemonName>

        </TeamMemberContainer>:null}

      </PokemonTeamContainer>

    </MainView>

  );
}

const MainView = styled.View`

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color:#F5F5F5;

`;

const SelectTeamHeader = styled.View`

  width:100%
  height:100px
  background-color:#ed1e24
  border-bottom-width: 4px;
  border-bottom-color: #000000
  display:flex
  justify-content:center
  align-items:center

`

const TeamHeaderLabel = styled.Text`

  font-family:PokemonStyle
  font-size:60px

`

const PokemonTeamContainer = styled.View`

  width:90%
  height:30%
  margin-top:5%
  display:flex
  flex-direction:row
  flex-wrap:wrap

`

const TeamMemberContainer = styled.View`

  height:50%
  width:33.33%
  align-items:center

`

const PokemonSprite = styled.Image`

  height:90%
  width:90%

`

const PokemonName = styled.Text`

  font-family:PokemonStyle
  font-size:25px

`
export default NewTeamManagerComponent;
