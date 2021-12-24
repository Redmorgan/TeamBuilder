import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

// components
import SelectPokemonComponent from "../Components/SelectPokemonComponent";

// images
import BugType from '../images/types/Bug.png'
import DarkType from '../images/types/Dark.png'

const SelectTeamScreen = ({ navigation: { navigate }, route }) => {

  var pokemonJson = [];

  async function getPokedexData(){

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

    var url = "https://pokeapi.co/api/v2/pokedex" + pokemonDex

    return fetch(url)
    .then((response) => response.json())
    .then((json) => {

      var pokedexJson = json["pokemon_entries"]

      for (var i = 0; i < pokedexJson.length; i++){

        var pokemon = pokedexJson[i]

        pokemon = pokemon["pokemon_species"]

        var speciesURL = pokemon["url"]

        var splitURL = speciesURL.split("pokemon-species")

        var pokemonEntryURL = "https://pokeapi.co/api/v2/pokemon" + splitURL[1]

        pokemonJson.push(pokemonEntryURL)
    
      }

    })
    .catch((error) => {
      console.error(error);
    });

  }

  getPokedexData()

  // async function getPokemonData(pokemonName){



  // }


  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

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
      
      <SelectPokemonComponent/>

      {/* <PokemonFlatList contentContainerStyle={{paddingBottom:10}}/> */}

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

const PokemonFlatList = styled.FlatList`

  width:100%
  background-color:#F5F5F5
  z-index:-1
  padding-top:10px

`

export default SelectTeamScreen;
