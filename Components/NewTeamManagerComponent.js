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

//JSON
import TypeEffects from '../typeEffects.json'

const NewTeamManagerComponent = ({ selectedTeam }) => {

  useEffect(()=>{
    (async () => {

      calculateWeakness()

    })()
  },[selectedTeam])

  var calculatedWeaknesses = []

  function calculateWeakness(){

    var Strengths = []
    var Weaknesses = []

    for(var i = 0; i <= selectedTeam.length-1; i++){

      var pokemon = selectedTeam[i]

      for(var j = 0; j <= pokemon.types.length-1; j++){

        for(var k = 0; k <= TypeEffects.length-1; k++){

          if(pokemon.types[j] == TypeEffects[k].name){

            for(var l = 0; l <= TypeEffects[k].strengths.length-1; l++){
              
              var duplicate = false;

              for(var m = 0; m <= Strengths.length-1; m++){

                if(Strengths[m] == TypeEffects[k].strengths[l]){

                  duplicate = true

                }

              }

              if(duplicate == false){

                Strengths.push(TypeEffects[k].strengths[l])

              }

            }

            for(var l = 0; l <= TypeEffects[k].weaknesses.length-1; l++){

              var duplicate = false

              for(var m = 0; m <= Weaknesses.length-1; m++){

                if(Weaknesses[m] == TypeEffects[k].weaknesses[l]){

                  duplicate = true

                }

              }

              if(duplicate == false){

                Weaknesses.push(TypeEffects[k].weaknesses[l])

              }

            }

          }

        }

      }

    }

    for(var i = 0; i <= Weaknesses.length-1; i++){

      var duplicate = false

      for(var j = 0; j <= Strengths.length-1; j++){

        if(Strengths[j] == Weaknesses[i]){

          duplicate = true

        }

      }

      if(duplicate == false){

        calculatedWeaknesses.push(Weaknesses[i])

      }

    }

    

  }

  function removeFromTeam(){



  }


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
        
      {(selectedTeam.length >= 1)?
      <TypeEffectivenessContainer>

        <TypeEffectiveTitle>Weak Against:</TypeEffectiveTitle>

        <TypeEffectivenessList>

          <WeaknessFlatList
            data={calculatedWeaknesses}
            />

        </TypeEffectivenessList>

      </TypeEffectivenessContainer>:null}

      {(selectedTeam.length >= 1)?
      <SaveTeamButton>

        <ButtonLabel>Save Team</ButtonLabel>

      </SaveTeamButton>:null}

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

const TypeEffectivenessContainer = styled.View`

  width:90%
  height:30%
  margin-top:10%

`

const TypeEffectiveTitle = styled.Text`

  font-family:PokemonStyle
  font-size:35px

`

const TypeEffectivenessList = styled.View`

  width:100%
  height:65%
  margin-top:10px

`

const WeaknessFlatList = styled.FlatList`

  width:100%
  flex-direction:row
  flex-wrap:wrap
  background-color:red

`

const SaveTeamButton = styled.View`

  width:60%
  height:10%
  margin-top:2.7%
  background-color:#ed1e24
  border-radius:25px
  border:3px solid #000000
  display:flex
  align-items:center
  justify-content:center

`

const ButtonLabel = styled.Text`

  font-family:PokemonStyle
  font-size:50px

`

const
export default NewTeamManagerComponent;
