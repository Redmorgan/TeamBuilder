import React, { useState }  from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

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

const SelectPokemonComponent = ({name, types, spriteURL, encounterURL, game}) => {

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }

  const [dataState, openPokemonData] = useState(false)
  const [locationData, setLocationData] = useState()
  const [flavorText, setFlavourText] = useState()
  const [pokemonTab, setPokemonTab] = useState(true)

  async function expandPokemonData(){

    onPressButton()

    if(locationData == null){

      setLocationData(await loadEncounterData())

      setFlavourText(await loadFlavourText())

    }

    openPokemonData(!dataState)

  }

  async function loadEncounterData(){


    try {
      const response = await fetch(
        encounterURL
      );
      const json = await response.json();
      
      var encounterData = json;

      var locations = []
        
      if(JSON.stringify(encounterData) == "[]"){

        locations.push("Only obtainable through evolution or special events.")

      }else{

        for(var i = 0; i < encounterData.length; i++){

          var encounterObj = encounterData[i]

          var versionDetails = encounterObj["version_details"]

          for(var k = 0; k < versionDetails.length; k++){

            var versionObj = versionDetails[k]

            if(versionObj["version"]["name"] == game){

              var foundLocation = formatLocationString(encounterObj["location_area"]["name"])

              locations.push(foundLocation)

            }

          }
  
        }

      }

      return locations

    } catch (error) {
      console.error(error);
    }

  }

  function formatLocationString(locationString){

    locationString = locationString.replace("-area","")
    locationString = locationString.replace(/-/g, " ")

    locationString = locationString[0].toUpperCase() + locationString.substring(1)

    return locationString

  }

  async function loadFlavourText(){

    var pokemonNumberArr = encounterURL.split("pokemon/")

    const pokemonSplit = pokemonNumberArr[1]

    pokemonNumberArr = pokemonSplit.split("/")

    const pokemonNumber = pokemonNumberArr[0]

    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemonNumber
      );
      const json = await response.json();
      
      const flavourData = json["flavor_text_entries"];

      for(var i = 0; i < flavourData.length; i++){

        var flavourObj = flavourData[i]

        if(flavourObj["language"]["name"] == "en" && flavourObj["version"]["name"] == game){
          
          var flavourString = JSON.stringify(flavourObj["flavor_text"])

          flavourString = flavourString.replace(/\\n/g, " ")

          flavourString = flavourString.replace(/\\f/g, " ")

          return flavourString

        }

      }

    } catch (error) {
      console.error(error);
    }

  }

  function openDescription(){

    onPressButton()
    setPokemonTab(true)

  }

  function openLocations(){

    onPressButton()
    setPokemonTab(false)

  }

  var typeImages = []

  for(var i = 0; i < types.length; i++){

    var type = types[i]

    if(type == "Bug"){

      typeImages.push(BugType)

    }else if(type == "Dark"){

      typeImages.push(DarkType)

    }else if(type == "Dragon"){

      typeImages.push(DragonType)

    }else if(type == "Electric"){

      typeImages.push(ElectricType)

    }else if(type == "Fairy"){

      typeImages.push(FairyType)

    }else if(type == "Fighting"){

      typeImages.push(FightingType)

    }else if(type == "Fire"){

      typeImages.push(FireType)

    }else if(type == "Flying"){

      typeImages.push(FlyingType)

    }else if(type == "Ghost"){

      typeImages.push(GhostType)

    }else if(type == "Grass"){

      typeImages.push(GrassType)

    }else if(type == "Ground"){

      typeImages.push(GroundType)

    }else if(type == "Ice"){

      typeImages.push(IceType)

    }else if(type == "Normal"){

      typeImages.push(NormalType)

    }else if(type == "Poison"){

      typeImages.push(PoisonType)

    }else if(type == "Psychic"){

      typeImages.push(PsychicType)

    }else if(type == "Rock"){

      typeImages.push(RockType)

    }else if(type == "Steel"){

      typeImages.push(SteelType)

    }else if(type == "Water"){

      typeImages.push(WaterType)

    }

  }

  return (

    <SelectPokemonContainer>

      <SelectPokemonWrapper>

        <SelectPokemonRowTouchable onPress={() => {expandPokemonData()}} underlayColor={'transparent'} activeOpacity={1}>

          <SelectPokemonRowWrapper>

            <PokemonNameLabel>{name}</PokemonNameLabel>

            <PokemonTypesContainer>

              <PokemonType source={typeImages[0]}/>

              {(types.length == 2)?<PokemonType source={typeImages[1]} style = {{marginLeft:5}}/>:null}

            </PokemonTypesContainer>

            <AddPokemonTouchable onPress={() => {onPressButton()}}>

              <AddPokemonIcon/>

            </AddPokemonTouchable>

          </SelectPokemonRowWrapper>

        </SelectPokemonRowTouchable>
        
        {(dataState)?
        <SelectPokemonExpand>

          <PokemonSprite source={{uri:spriteURL}}/>

          <PokemonDataContainer>

            {(pokemonTab)?<PokemonFlavourText>{flavorText}</PokemonFlavourText>:null}

            {(!pokemonTab)?

            <LocationFlatListContainer>
              <LocationFlatList
                data = {locationData}
                keyExtractor={(item) => item}
                nestedScrollEnabled
                renderItem={({ item }) => (<LocationLabel>{item}</LocationLabel>)}
                contentContainerStyle={{paddingBottom:10}}/>
            </LocationFlatListContainer>
              :null}
            
            <PokemonDataTabs>

              <PokemonDescriptionButton onPress={()=>{openDescription()}} underlayColor={'#ed1e24'} activeOpacity={1} style={{backgroundColor:pokemonTab ? "#c2191e":"#ed1e24"}}>

                <ButtonLabel>Desc</ButtonLabel>

              </PokemonDescriptionButton>

              <PokemonLocationButton onPress={()=>{openLocations()}} underlayColor={'#ed1e24'} activeOpacity={1} style={{backgroundColor:pokemonTab ? "#ed1e24":"#c2191e"}}>

                <ButtonLabel>Locations</ButtonLabel>

              </PokemonLocationButton>

            </PokemonDataTabs>

          </PokemonDataContainer>

        </SelectPokemonExpand>:null}

      </SelectPokemonWrapper>

    </SelectPokemonContainer>

  );
}

const SelectPokemonContainer = styled.View`

  width: 95%;
  margin-left:2.5%
  margin-bottom:2%

`;

const SelectPokemonWrapper = styled.View`

  width:100%

`

const SelectPokemonRowTouchable = styled.TouchableHighlight`

  width: 100%
  height: 80px
  border: 3px solid #000000
  border-top-left-radius:20px
  border-bottom-left-radius:20px
  border-top-right-radius:90px
  border-bottom-right-radius:90px

`

const SelectPokemonRowWrapper = styled.View`

  width:100%
  height:100%
  display: flex;
  align-items: center;
  flex-direction:row

`

const PokemonTypesContainer = styled.View`

  width:105px
  height:50px
  display: flex;
  flex-direction:row
  margin-left:10px

`

const PokemonNameLabel = styled.Text`

  font-size:45px
  font-family:PokemonStyle
  margin-left:10px
  width:45%

`

const PokemonType = styled.Image`

  height:50px
  width:50px
  border-radius:90px

`

const AddPokemonTouchable = styled.TouchableHighlight`

  width:50px
  height:50px
  border-radius:90px
  background-color:pink
  position:absolute
  right:15px

`

const AddPokemonIcon = styled.Image`

  width:100%
  height:100%

`

const SelectPokemonExpand = styled.View`

  width:88.5%
  height:160px
  margin-left:2%
  border-bottom-left-radius:20px
  border-bottom-right-radius:20px
  border-right-color:#000000
  border-left-color:#000000
  border-bottom-color:#000000
  border-right-width:3px
  border-left-width:3px
  border-bottom-width:3px
  display: flex;
  flex-direction:row
  align-items:center

`

const PokemonSprite = styled.Image`

  width:120px
  height:120px

`

const PokemonDataContainer = styled.View`

  width:64.6%
  height:100%

`

const PokemonFlavourText = styled.Text`
  width:100%
  height:70%
  font-family:PokemonStyle
  font-size:19px
  padding-top:10px
  text-align:justify
  padding-right:10px
  line-height:18px

`

const LocationFlatListContainer = styled.View`
  height:70%
  width:100%
  display:flex

`

const LocationFlatList = styled.FlatList`

  height:90%
  padding-top:10px

`

const PokemonDataTabs = styled.View`

  width:100%
  height:25%
  display:flex
  flex-direction:row
  justify-content:space-around

`

const PokemonDescriptionButton = styled.TouchableHighlight`

  height:100%
  width:40%
  background-color:#ed1e24
  display:flex
  justify-content:center
  align-items:center
  border-radius:5px
  border: 1px solid #000000

`

const PokemonLocationButton = styled.TouchableHighlight`

  height:100%
  width:40%
  background-color:#ed1e24
  display:flex
  justify-content:center
  align-items:center
  border-radius:5px
  border: 1px solid #000000

`

const ButtonLabel = styled.Text`

  font-family:PokemonStyle
  font-size:20px

`

const LocationLabel = styled.Text`

  font-family:PokemonStyle
  font-size:20px

`

export default SelectPokemonComponent;
