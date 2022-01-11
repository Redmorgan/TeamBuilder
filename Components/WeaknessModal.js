/**
 * @fileoverview This component is a pop-up that appears when a user click on a pokemon in their team to see what their weaknesses are.
 */
import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { Entypo } from '@expo/vector-icons';

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
 
 /**
  * @summary A pop-up that tells the user what weaknesses a pokemon has.
  * 
  * @param {Boolean}     state - The current open/close state of the modal.
  * @param {String List}    weakness - The weaknesses a pokemon has.
  * @param {Function}    closeDeleteModal - The function that opens/closes the pokemon weakness modal.
  *  
  * @returns A formatted modal.
  */
 const WeaknessModalComponent = ({ state, types, closeWeaknessModal }) => {
 
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
      * @summary Closes the pokemon weakness overlay.
      * 
      * @description Runs when the X button is pressed to close the currently pokemon weakness overlay.
      */
     function closeOverlay(){
 
        onPressButton()

        closeWeaknessModal(false)
 
     }

     var weaknesses = []

     for(var i = 0; i < TypeEffects.length; i++){

        for(var j = 0; j < types.length; j++){

            if(TypeEffects[i].name == types[j]){

                for(var k = 0; k < TypeEffects[i].weaknesses.length; k++){

                    var duplicate = false

                    for(var l = 0; l < weaknesses.length; l++){

                        if(weaknesses[l] == TypeEffects[i].weaknesses[k]){

                            duplicate = true

                        }

                    }

                    if(duplicate == false){

                        weaknesses.push(TypeEffects[i].weaknesses[k])

                    }

                }

            }

        }

     }

     var typeImages = []

     for(var i = 0; i < weaknesses.length; i++){

        var type = weaknesses[i]
    
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
 
     <WeaknessModal
         visible={state}
         animationType='fade'
         transparent={true}>
 
         <WeaknessContainer>
 
             <WeaknessBody>

                <CloseModalButton onPress={()=>{closeOverlay()}} underlayColor={'transparent'} activeOpacity={1}>

                    <Entypo name="cross" size={45} color="black" />  

                </CloseModalButton>

                <WeaknessHeader>Weaknesses</WeaknessHeader>

                <WeaknessListWrapper>

                    <WeaknessFlatList
                    data={typeImages}
                    keyExtractor={(item) => item}
                    numColumns={4}
                    renderItem={({ item }) => (<TypeImage source={item}/>)}
                    />

                </WeaknessListWrapper>
 
             </WeaknessBody>
 
         </WeaknessContainer>
 
     </WeaknessModal>
 
   );
 }

const WeaknessModal = styled.Modal`
`
 
const WeaknessContainer = styled.View`

    flex:1;
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);

`
 
const WeaknessBody = styled.View`
 
    width:80%
    height:30%
    background-color:#ffffff
    border-radius:20px
    border: 4px solid #000000
    align-items:center;
 
`
 
const WeaknessHeader = styled.Text`
 
    font-family:PokemonStyle
    font-size:40px
    margin-top:10px
    text-align:center
 
`

const WeaknessListWrapper = styled.View`
 
    width:91%
    height:64%
    margin-top:5%
 
`

const WeaknessFlatList = styled.FlatList`
 
    width:100%
 
`

const TypeImage = styled.Image`

    width:65px
    height:65px
    margin-right:10px
    margin-bottom:10px

`

const CloseModalButton = styled.TouchableHighlight`

    width:40px
    height:40px
    position:absolute
    top:5px
    right:10px
    justify-content:center
    align-items:center

`

 
export default WeaknessModalComponent;
 