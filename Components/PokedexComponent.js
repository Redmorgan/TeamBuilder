import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// components
import SelectPokemonComponent from "../Components/SelectPokemonComponent";
import LoadingComponent from "../Components/LoadingComponent";

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

const PokedexComponent = ({ game, finalPokemonData }) => {

  return (

    <MainView>

        <SelectTeamHeader>

          <RadialTouchable onPress={()=>{Vibration.vibrate(8)}} activeOpacity={1}>

            <TypeSelectRadial>

              <TypeSelectImage source={DarkType}/>

              {/* <AntDesign name="filter" size={50} color="black" /> */}

            </TypeSelectRadial>

          </RadialTouchable>

          <PokemonSearchBarContainer>

            <PokemonSearchBar>

            </PokemonSearchBar>

            <AntDesign name="search1" size={40} color="black" />
            

          </PokemonSearchBarContainer>

        </SelectTeamHeader>
        
        {(finalPokemonData == null)?
        <LoadingComponent/>:

        <PokemonFlatListContainer>

          <PokemonFlatList
            data = {finalPokemonData}
            keyExtractor={(item) => item.name}
            nestedScrollEnabled
            renderItem={({ item }) => (<SelectPokemonComponent name={item['name']} types={item['types']} spriteURL={item['sprite']} encounterURL={item['encounterURL']} game={game}/>)}
            contentContainerStyle={{paddingBottom:10}}/>
          
        </PokemonFlatListContainer>}

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

`

const RadialTouchable = styled.TouchableHighlight`

  width:100px
  height:100px
  position:absolute
  z-index:10
  top:30px
  right:5px
  border-radius:90px

`

const TypeSelectRadial = styled.View`

  width:100%
  height:100%
  background-color:#ffffff
  border-radius:90px
  border: 4px solid #000000
  display: flex;
  align-items: center;
  justify-content:center

`

const TypeSelectImage = styled.Image`

  width:93px
  height:93px
  border-radius:90px

`

const PokemonSearchBarContainer = styled.View`

  width:69%
  height:55px
  background-color:#ffffff
  margin-top:35px
  margin-left:3%
  border-radius:10px
  border: 2px solid #000000
  display:flex;
  flex-direction:row;
  align-items:center

`

const PokemonSearchBar = styled.TextInput`

  border-radius:8px
  font-size:40px
  padding-left:10px
  height:100%;
  width:85%
  font-family:PokemonStyle

`

const PokemonFlatListContainer = styled.View`

  width:100%
  height:80%

`

const PokemonFlatList = styled.FlatList`

  width:100%
  background-color:#F5F5F5
  z-index:-1
  padding-top:10px

`

export default PokedexComponent;
