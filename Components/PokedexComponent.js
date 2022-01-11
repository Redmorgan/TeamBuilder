/**
 * @fileoverview Main Pokedex component that contains flat list that loads all the pokemon that exist in that pokedex. 
 */

import React, { useState, useEffect } from "react";
import { Vibration, Alert } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';

// components
import SelectPokemonComponent from "../Components/SelectPokemonComponent";
import LoadingComponent from "../Components/LoadingComponent";
import TypeFilterModalComponent from "./TypeFilterModalComponent";

// images
import BugType from '../images/types/Bug.png'
import DarkType from '../images/types/Dark.png'
import DragonType from '../images/types/Dragon.png'
import ElectricType from '../images/types/Electric.png'
import FairyType from '../images/types/Fairy.png'
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

/**
 * 
 * @param {String}      game - The currently selected game.
 * @param {Object List} finalPokemonData - Pokemon data collecting from pokeApi.
 * @param {Object List} selectedTeam - The currently selected pokemon team.
 * 
 * @returns A pokedex component with a list of all the pokemon in it. 
 */
const PokedexComponent = ({ game, finalPokemonData, selectedTeam }) => {

  const[pokedexData, setPokedexData] = useState([])

  const[filterState, setFilterState] = useState(false)

  const[currentFilter, setCurrentFilter] = useState("none")

  const[searchString, setSearch] = useState("")

  useEffect(()=>{
    (async () => {

      if(finalPokemonData != null){

        setPokedexData(finalPokemonData)

      }

    })()
  },[finalPokemonData])

  /**
   * @summary Filters the flat list based on the search string and the type filter
   * 
   * @param {String} searchString - The search string the pokedex is being filtered by.
   * @param {String} typeFilter - The pokemon type the pokedex is being filtered by.
   * 
   * @description Takes in a search string and a type filter in order to filter the currently loaded pokedex
   * to display only the pokemon with names that match the search string and that match the type set by the type
   * filter.
   */
  function filterPokedex(searchString, typeFilter) {

    if(finalPokemonData != null){  
      
      setSearch(searchString)

      var filteredPokedexData;
      if(typeFilter == "none"){

        filteredPokedexData = finalPokemonData.filter(function (pokemon) {
          
          return pokemon.name.includes(searchString)

        })

      }else{

        filteredPokedexData = finalPokemonData.filter(function (pokemon) {
          
          if(pokemon.types.length == 1){

            return pokemon.name.includes(searchString) && pokemon.types[0].toUpperCase() == typeFilter.toUpperCase()
    
          }else if(pokemon.types.length == 2){
    
            return pokemon.name.includes(searchString) && (pokemon.types[0].toUpperCase() == typeFilter.toUpperCase() || pokemon.types[1].toUpperCase() == typeFilter.toUpperCase())
    
          }

        })

      } 

      setPokedexData(filteredPokedexData)

    }

  }

    /**
     * @summary Returns a pokemon type image based on the inputted type.
     * 
     * @param {String} type - Pokemon Type 
     * 
     * @returns Pokemon type image based on the input.
     */
  function getTypeImage(type){

    if(type == "bug"){

      return BugType

    }else if(type == "dark"){

      return DarkType

    }else if(type == "dragon"){

      return DragonType

    }else if(type == "electric"){

      return ElectricType

    }else if(type == "fairy"){

      return FairyType

    }else if(type == "fighting"){

      return FightingType

    }else if(type == "fire"){

      return FireType

    }else if(type == "flying"){

      return FlyingType

    }else if(type == "ghost"){

      return GhostType

    }else if(type == "grass"){

      return GrassType

    }else if(type == "ground"){

      return GroundType

    }else if(type == "ice"){

      return IceType

    }else if(type == "normal"){

      return NormalType

    }else if(type == "poison"){

      return PoisonType

    }else if(type == "psychic"){

      return PsychicType

    }else if(type == "rock"){

      return RockType

    }else if(type == "steel"){

      return SteelType

    }else if(type == "water"){

      return WaterType

    }

  }

  /**
   * @summary Changes the currently set filter then applies that filter to the pokedex
   * 
   * @param {String} type - Pokemon Type 
   */
  function applyFilter(type){

    setCurrentFilter(type)
    filterPokedex(searchString, type)

  }


  /**
   * @summary Adds the selected pokemon to the users team
   * 
   * @param {Object} pokemon - Object data of the selected pokemon
   * 
   * @description Adds the currently selected pokemon onto the users team if the team currently
   * has less than 6 pokemon, if they have 6 pokemon an alert pops up on the screen informing the
   * user that they already have 6 pokemon on their team. 
   */
  function addPokemonToTeam(pokemon){

    if(selectedTeam.length < 6){

      selectedTeam.push(pokemon)

    }else{

      Alert.alert(
        "Team Error",
        "You already have 6 pokemon on your team.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      )

    }

  }

  return (

    <MainView>

        <SelectTeamHeader>

            <TypeFilterModalComponent state={filterState} closeFilterOverlay={() => {setFilterState(false)}} setFilter = {applyFilter}/>

            <RadialTouchable onPress={()=>{Vibration.vibrate(8); setFilterState(true)}} activeOpacity={1}>

            <TypeSelectRadial>

              {(currentFilter == "none")?
              <AntDesign name="filter" size={50} color="black" />:

              <TypeSelectImage source={getTypeImage(currentFilter)}/>}

            </TypeSelectRadial>

            </RadialTouchable>

            <PokemonSearchBarContainer>

              <PokemonSearchBar placeholder="Search Pokedex" onChangeText={text => filterPokedex(text, currentFilter)}/>

              <AntDesign name="search1" size={40} color="black" />

            </PokemonSearchBarContainer>

        </SelectTeamHeader>
        
        {(finalPokemonData == null)?
        <LoadingComponent/>:

        <PokemonFlatListContainer>

          <PokemonFlatList
            data = {pokedexData}
            keyExtractor={(item) => item.name}
            nestedScrollEnabled
            renderItem={({ item }) => (<SelectPokemonComponent name={item['name']} types={item['types']} spriteURL={item['sprite']} encounterURL={item['encounterURL']} game={game} addToTeam={addPokemonToTeam}/>)}
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
