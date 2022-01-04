import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
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
import DeleteIcon from '../images/deleteIcon.png'

//JSON
import TypeEffects from '../typeEffects.json'

const NewTeamManagerComponent = ({ selectedTeam, setTeam }) => {

  

  const[weaknesses, setWeaknesses] = useState([])

  const[currentTeam, setCurrentTeam] = useState(selectedTeam)

  useEffect(()=>{
    (async () => {

      calculateWeakness()

    })()
  },[currentTeam])

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }

  function calculateWeakness(){

    var Strengths = []
    var Weaknesses = []
    var calculatedWeaknesses = []

    for(var i = 0; i <= currentTeam.length-1; i++){

      var pokemon = currentTeam[i]

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

    setWeaknesses(calculatedWeaknesses)

  }

  function getTypeImage(type){

    if(type == "Bug"){

      return BugType

    }else if(type == "Dark"){

      return DarkType

    }else if(type == "Dragon"){

      return DragonType

    }else if(type == "Electric"){

      return ElectricType

    }else if(type == "Fairy"){

      return FairyType

    }else if(type == "Fighting"){

      return FightingType

    }else if(type == "Fire"){

      return FireType

    }else if(type == "Flying"){

      return FlyingType

    }else if(type == "Ghost"){

      return GhostType

    }else if(type == "Grass"){

      return GrassType

    }else if(type == "Ground"){

      return GroundType

    }else if(type == "Ice"){

      return IceType

    }else if(type == "Normal"){

      return NormalType

    }else if(type == "Poison"){

      return PoisonType

    }else if(type == "Psychic"){

      return PsychicType

    }else if(type == "Rock"){

      return RockType

    }else if(type == "Steel"){

      return SteelType

    }else if(type == "Water"){

      return WaterType

    }

  }

  function removeFromTeam(name){

    onPressButton()

    var updatedTeam = []

    console.log(currentTeam)

    for(var teamIndex = 0; teamIndex <= currentTeam.length-1; teamIndex++){

      var pokemon = currentTeam[teamIndex]

      if(pokemon['name'] != name){

        updatedTeam.push(currentTeam[teamIndex])

      }

    }

    setTeam(updatedTeam)
    setCurrentTeam(updatedTeam)

  }


  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

      <SelectTeamHeader>

        <TeamHeaderLabel>Current Team</TeamHeaderLabel>

      </SelectTeamHeader>

      <PokemonTeamContainer>

        {(currentTeam.length >= 1 )?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[0].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[0].spriteURL}}/>

          <PokemonName>{currentTeam[0].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(currentTeam.length >= 2)?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[1].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[1].spriteURL}}/>

          <PokemonName>{currentTeam[1].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(currentTeam.length >= 3)?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[2].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[2].spriteURL}}/>

          <PokemonName>{currentTeam[2].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(currentTeam.length >= 4)?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[3].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[3].spriteURL}}/>

          <PokemonName>{currentTeam[3].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(currentTeam.length >= 5)?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[4].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[4].spriteURL}}/>

          <PokemonName>{currentTeam[4].name}</PokemonName>

        </TeamMemberContainer>:null}

        {(currentTeam.length >= 6)?
        <TeamMemberContainer>

          <RemovePokemonTouchable onPress={() => {removeFromTeam(currentTeam[5].name)}} underlayColor={'transparent'} activeOpacity={1}>

            <RemovePokemonImage source={DeleteIcon}/>

          </RemovePokemonTouchable>

          <PokemonSprite resizeMode="contain" source={{uri:currentTeam[5].spriteURL}}/>

          <PokemonName>{currentTeam[5].name}</PokemonName>

        </TeamMemberContainer>:null}

      </PokemonTeamContainer>
        
      {(currentTeam.length >= 1)?
      <TypeEffectivenessContainer>

        <TypeEffectiveTitle>Weak Against:</TypeEffectiveTitle>

        <TypeEffectivenessList>

          <WeaknessFlatList
            data={weaknesses}
            keyExtractor={(item) => item}
            numColumns={5}
            renderItem={({ item }) => (<TypeImage source={getTypeImage(item)}/>)}
            />

        </TypeEffectivenessList>

      </TypeEffectivenessContainer>:null}

      {(currentTeam.length >= 1)?
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

`

const TypeImage = styled.Image`

  width:60px
  height:60px
  margin-right:10px
  margin-bottom:10px

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

export default NewTeamManagerComponent;
