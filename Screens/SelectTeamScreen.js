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

const SelectTeamScreen = ({ navigation: { navigate }, route, game }) => {

  const [currentTab, setCurrentTab] = useState(true)

  const [finalPokemonData, setPokemonData] = useState()

  const[pokemonTeam, setPokemonTeam] = useState([])

  async function getPokedexData(){

    var pokemonDex = getDexNumber()

    var url = "https://pokeapi.co/api/v2/pokedex" + pokemonDex

    const pokedexJson = await getPokemonFromPokedex(url)

    const pokemonURL_Json = getPokemonDataURLs(pokedexJson)

    var pokemonData = await getPokemonDataFromURLs(pokemonURL_Json)

    setPokemonData(pokemonData)

  }

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

  function getPokemonDataURLs(pokedexData){

    var pokemonURLs = []

    for (var i = 0; i < 10; i++){

      var pokemon = pokedexData[i]

      pokemon = pokemon["pokemon_species"]

      var speciesURL = pokemon["url"]

      var splitURL = speciesURL.split("pokemon-species")

      var pokemonEntryURL = "https://pokeapi.co/api/v2/pokemon" + splitURL[1]

      pokemonURLs.push(pokemonEntryURL)
  
    }

    return pokemonURLs

  }

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

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }

  function openPokedexTab(){

    onPressButton()
    setCurrentTab(true)

  }

  function openManageTeamTab(){

    onPressButton()
    setCurrentTab(false)

  }


  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

      {(currentTab)?
        <PokedexComponent regionData = {route.params.region} game = {route.params.game} finalPokemonData={finalPokemonData} selectedTeam={pokemonTeam}/>:
        <NewTeamManagerComponent selectedTeam={pokemonTeam} setTeam={setPokemonTeam}/>}

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

  width:100%
  height:8%
  background-color:#ed1e24
  position:absolute
  bottom:0
  border-top-width: 4px;
  border-top-color: #000000
  display:flex
  flex-direction:row

`

const SelectTeamTabButton = styled.TouchableHighlight`

  width:50%
  height:100%

`

const ManageTeamTabButton = styled.TouchableHighlight`

  width:50%
  height:100%

`

const ButtonWrapper = styled.View`

  height:100%
  width:100%
  display:flex
  align-items:center
  justify-content:center

`

const TabIconImage = styled.Image`

  width:32px
  height:32px

`

const TabLabel = styled.Text`

  font-family:PokemonStyle
  font-size:25px

`

export default SelectTeamScreen;
