/**
 * @fileoverview The team member page showing the team that the user has currently selected, as well as the weaknesses of that team.
 */

import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
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

// JSON
import TypeEffects from '../typeEffects.json'

// Components
import TeamMemberComponent from "./TeamMemberComponent";

/**
 * @summary The components building up the team viewer in the application.
 * 
 * @param {Object} selectedTeam - The currently selected team.
 * @param {Function} setTeam - useState function for updating the currently selected team.
 * @param {Function} navigation - Passed through navigation function for navigation between stacks.
 * @param {String} game - The currently selected pokemon game i.e. Red, Blue, Yellow.
 * @param {String} region - The region of the currently selected game i.e. Kanto, Hoenn, Johto.
 * @param {String} teamID - ID of the team getting updated.
 * 
 * @returns The team member page displaying the currently selected team as well as the teams weaknesses
 */
const NewTeamManagerComponent = ({ selectedTeam, setTeam, navigation, game, region, teamID }) => {

  const[weaknesses, setWeaknesses] = useState([])

  const[currentTeam, setCurrentTeam] = useState(selectedTeam)

  useEffect(()=>{
    (async () => {

      calculateWeakness()

    })()
  },[currentTeam])


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
   * @summary Finds the weaknesses of a team based off all of the strengths and weaknesses of the team
   * 
   * @description This functions find out what the weaknesses of a selected pokemon team are by comparing all the strengths and
   * weaknesses of all the pokemon on the team to find out which weaknesses arent covered. This final list gets saved into the useState
   * 'weaknesses' where a flat list then displays these weaknesses to the user.
   */
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

  /**
   * @summary Returns a pokemon type image based on the inputted type.
   * 
   * @param {String} type - Pokemon Type
   * 
   * @returns Pokemon type image based on the input.
   */
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

  /**
   * @summary Removes a selected pokemon from the current team
   * 
   * @description Removes the pokemon from the passed through index position from the team and updates the useState storing
   * the team with the new team that does not have the pokemon that was just removed
   * 
   * @param {Integer} teamIndex - Index position of the pokemon on the team
   */
  function removeFromTeam(teamIndex){

    onPressButton()

    var updatedTeam = []

    for(var i = 0; i <= currentTeam.length-1; i++){

      var pokemon = currentTeam[i]

      if(i != teamIndex){

        updatedTeam.push(pokemon)

      }

    }

    setTeam(updatedTeam)
    setCurrentTeam(updatedTeam)

  }

  /**
   * @summary Saves the currently selected team to the devices storage as well as sending the user back to the homescreen
   * 
   * @description This function runs when the 'Complete Team' button is pressed, it saves a copy of the team to the users devices
   * storage so that it can be accessed later from the 'My Teams' page which can be accessed from the home screen.
   */
  function onPressSave(){

    onPressButton()

    saveTeam()

    navigation.reset({
      index:0,
      routes: [{ name: 'Start' }]
    })

  }

  /**
   * @summary Saves/updates a copy of the team to the local storage of the device
   * 
   * @description Using Async Storage the currently selected game, region, and team are saved to the local storage of the device
   * using the current date/time as a unique identifier for the record. If this is a new team a new record is created, if it's a team
   * that is being updated then the currently selected team is saved against the ID of the team being edited.
   */
  const saveTeam = async () => {

    try {

      var UID = Date.now()

      UID = UID.toString()

      const teamData = {game:game, region:region, team:selectedTeam}


      if(teamID != null){

        await AsyncStorage.setItem(teamID, JSON.stringify(teamData))

      }else{

        await AsyncStorage.setItem(UID, JSON.stringify(teamData))

      }

    } catch (e) {

      console.log("Error whilst saving pokemon team.")

    }

  }

  return (

    <MainView>

      <StatusBar backgroundColor="#ed1e24" style="inverted" />

      <SelectTeamHeader>

        <TeamHeaderLabel>Current Team</TeamHeaderLabel>

      </SelectTeamHeader>

      <PokemonTeamContainer>

        {(currentTeam.length >= 1)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[0]} index={0} readOnly={false}/>:null}

        {(currentTeam.length >= 2)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[1]} index={1} readOnly={false}/>:null}

        {(currentTeam.length >= 3)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[2]} index={2} readOnly={false}/>:null}

        {(currentTeam.length >= 4)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[3]} index={3} readOnly={false}/>:null}

        {(currentTeam.length >= 5)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[4]} index={4} readOnly={false}/>:null}

        {(currentTeam.length >= 6)? <TeamMemberComponent removeFromTeam={removeFromTeam} pokemon={currentTeam[5]} index={5} readOnly={false}/>:null}

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
      <SaveTeamButton onPress={()=>{onPressSave()}} underlayColor={'#ed1e24'} activeOpacity={1}>

        <ButtonLabel>Complete Team</ButtonLabel>

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

const SaveTeamButton = styled.TouchableHighlight`

  width:65%
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

export default NewTeamManagerComponent;
