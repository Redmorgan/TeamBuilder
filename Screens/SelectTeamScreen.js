/**
 * @fileoverview Main file for the team builder where users add pokemon to their team and are able to see the weaknesses their team has.
 */

import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'

// components
import PokedexComponent from "../Components/PokedexComponent";
import NewTeamManagerComponent from "../Components/NewTeamManagerComponent";

// images
import pokedexIcon from '../images/pokedexIcon.png'
import pokeballsIcon from '../images/pokeballsIcon.png'

/**
 * 
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 * @param {Function} route - Pass through data from the previous layer of the stack.
 *  
 * @returns Screen displaying pokedex of the selected game.
 */
const SelectTeamScreen = ({ navigation, route }) => {

  const [currentTab, setCurrentTab] = useState(true)

  const [finalPokemonData, setPokemonData] = useState()

  const[pokemonTeam, setPokemonTeam] = useState([])

  const[isTeamLoaded, setTeamLoaded] = useState(false)


  if(isTeamLoaded == false){

    if(route.params.selectedTeam != null){

      setTeamLoaded(true)

      setPokemonTeam(route.params.selectedTeam)

      setCurrentTab(false)

    }

  }

  /**
   * @summary Calls pokeApi to collect the pokedex data for the selected game.
   * 
   * @description Based on the game the user selects a different pokedex is used. Based on this a different URL is built
   * for collecting that pokedex data. The data has to be collected through 2 main API calls and 3 functions in order to
   * collect all the data needed for building the pokedex.
   */
  async function getPokedexData(){

    var pokemonDex = getDexNumber()

    var url = "https://pokeapi.co/api/v2/pokedex" + pokemonDex

    const pokedexJson = await getPokemonFromPokedex(url)

    const pokemonURL_Json = getPokemonDataURLs(pokedexJson)

    var pokemonData = await getPokemonDataFromURLs(pokemonURL_Json)

    setPokemonData(pokemonData)

  }

  /**
   * @summary Returns the end of the URL path for the pokedex based on the game that was selected on the SelectGameScreen.
   * 
   * @returns The ending of the URL for the pokedex based on the selected games region.
   */
  function getDexNumber(){

    var region = route.params.region

    var pokemonDex = ""

    if(region == "Kanto"){

      pokemonDex = "/2/"

    }else if(region == "Johto"){

      pokemonDex = "/3/"

    }else if(region == "Hoenn"){

      pokemonDex = "/4/"

    }else if(region == "Sinnoh"){

      pokemonDex = "/5/"

    }else if(region == "Unova"){

      pokemonDex = "/8/"

    }

    return pokemonDex

  }

  /**
   * @summary Calls pokeApi to collect all the pokemon from the pokedex of the selected game.
   * 
   * @param {String} url - URL for the API to collect the pokedex data of the selected game.
   * 
   * @returns JSON containing data about all the pokemon in the selected games pokedex.
   */
  const getPokemonFromPokedex = async (url) => {
    try {
      const response = await fetch(
        url
      );
      const json = await response.json();
      
      return json["pokemon_entries"]

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @summary Produces a list of URLs used for calling the API to collect data on all the pokemon.
   * 
   * @param {Object List} pokedexData - List of pokemon collected from the pokedex.
   *  
   * @returns List of URLs used to get the data needed for forming the pokedex.
   */
  function getPokemonDataURLs(pokedexData){

    var pokemonURLs = []

    for (var i = 0; i < pokedexData.length; i++){

      var pokemon = pokedexData[i]

      pokemon = pokemon["pokemon_species"]

      var speciesURL = pokemon["url"]

      var splitURL = speciesURL.split("pokemon-species")

      var pokemonEntryURL = "https://pokeapi.co/api/v2/pokemon" + splitURL[1]

      pokemonURLs.push(pokemonEntryURL)
  
    }

    return pokemonURLs

  }

  /**
   * @summary Using the list produced by getPokemonDataURLs, it calls them all to collect data for all of the pokemon.
   * 
   * @param {String List} pokemonURL_Json - List of all the built pokeApi URLs
   * 
   * @returns Object data of all the pokemon in the pokedex for the selected game. 
   */
  const getPokemonDataFromURLs = async (pokemonURL_Json) => {

    var filteredPokemon = []

    for (var i = 0; i < pokemonURL_Json.length; i++){

      try {
        const response = await fetch(
          pokemonURL_Json[i]
        );
        const json = await response.json();
        
        var pokemonName = json.name

        if(pokemonName.includes("deoxys")){

          pokemonName = "deoxys"

        }else if(pokemonName.includes("-m")){

          pokemonName = pokemonName.replace("-m", " ♂")

        }else if(pokemonName.includes("-f")){

          pokemonName = pokemonName.replace("-f", " ♀")

        }

        var singlePokemon = {name:(pokemonName[0].toUpperCase() + pokemonName.substring(1)), types:sortTypeData(json.types), sprite:json.sprites.front_default, encounterURL:json.location_area_encounters}
        filteredPokemon.push(singlePokemon)

      } catch (error) {
        console.error(error);
      }

    }

    return filteredPokemon

  }

  /**
   * @summary Takes the types object, formats the text, and puts them into a string list.
   * 
   * @param {Object} typeObject - Contains the types a pokemon has.
   *  
   * @returns A string list of formatted types.
   */
  function sortTypeData(typeObject){

    var types = []

    var type1 = typeObject[0].type.name

    type1 = type1[0].toUpperCase() + type1.substring(1)

    types.push(type1)

    if(typeObject.length > 1){

      var type2 = typeObject[1].type.name

      type2 = type2[0].toUpperCase() + type2.substring(1)

      types.push(type2)

    }

    return types

  }

  useEffect(()=>{
    (async () => {

      getPokedexData()

    })()
  },[])

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
   * @summary Opens the pokedex tab.
   * 
   * @description When the pokedex tab at the bottom of the screen is pressed, this function runs which opens the pokedex tab if it
   * is not already open.
   */
  function openPokedexTab(){

    onPressButton()
    setCurrentTab(true)

  }

  /**
   * @summary Opens the manage team tab.
   * 
   * @description When the manage team tab at the bottom of the screen is pressed, this function runs which opens the manage team tab if it
   * is not already open.
   */
  function openManageTeamTab(){

    onPressButton()
    setCurrentTab(false)

  }

  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

      {(currentTab)?
        <PokedexComponent regionData={route.params.region} game={route.params.game} finalPokemonData={finalPokemonData} selectedTeam={pokemonTeam}/>:
        <NewTeamManagerComponent selectedTeam={pokemonTeam} setTeam={setPokemonTeam} navigation={navigation} game={route.params.game} region={route.params.region} teamID={route.params.teamID}/>}

      <SelectTeamTabControls>

        <SelectTeamTabButton style={{borderRightWidth:1, borderRightColor:"#000000"}} onPress={()=>{openPokedexTab()}} underlayColor={'#ed1e24'} activeOpacity={1}>

          <ButtonWrapper>

            <TabIconImage style={{opacity: currentTab ? 1:0.7}} source={pokedexIcon}/>

            <TabLabel>Pokedex</TabLabel>

          </ButtonWrapper>

        </SelectTeamTabButton>

        <ManageTeamTabButton style={{borderLeftWidth:1, borderLeftColor:"#000000"}} onPress={()=>{openManageTeamTab()}} underlayColor={'#ed1e24'} activeOpacity={1}>
          
          <ButtonWrapper>

            <TabIconImage style={{opacity: currentTab == false ? 1:0.7}} source={pokeballsIcon}/>

            <TabLabel>Manage Team</TabLabel>

          </ButtonWrapper>

        </ManageTeamTabButton>

      </SelectTeamTabControls>

    </MainView>

  );
}

const MainView = styled.View`

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color:#F5F5F5;

`

const SelectTeamTabControls = styled.View`

  width:100%;
  height:8%;
  background-color:#ed1e24;
  position:absolute;
  bottom:0;
  border-top-width: 4px;
  border-top-color: #000000;
  display:flex;
  flex-direction:row;

`

const SelectTeamTabButton = styled.TouchableHighlight`

  width:50%;
  height:100%;

`

const ManageTeamTabButton = styled.TouchableHighlight`

  width:50%;
  height:100%;

`

const ButtonWrapper = styled.View`

  height:100%;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;

`

const TabIconImage = styled.Image`

  width:32px;
  height:32px;

`

const TabLabel = styled.Text`

  font-family:PokemonStyle;
  font-size:25px;

`

export default SelectTeamScreen;
