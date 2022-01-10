/**
 * @fileoverview Modal for letting users select what type they want to filter the pokedex by.
 */

import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

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
 * @param {Boolean}     state - The current open/close state of the types modal.
 * @param {Function}    closeFilterOverlay - Function for opening/closing the types modal.
 * @param {Function}    setFilter - Function for setting the type to filter the pokedex by.
 *  
 * @returns A modal containing a list of pokemon types. 
 */
const TypeFilterModalComponent = ({ state, closeFilterOverlay, setFilter }) => {

    const[selectedType, selectType] = useState()

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
     * @summary Sets the current filter based on which type was clicked on.
     * 
     * @param {String} type 
     * 
     * @description Runs when one of the type icons is pressed which will put a border around that type to show that it has been
     * selected.
     */
    function selectTypeFilter(type){

        onPressButton()
        selectType(type)

    }

    /**
     * @summary Closes the filter pop-up as well as removing any currently set type filters.
     * 
     * @description Runs when the 'Clear' button has been clicked by the user, once it has been the type pop-up closes and the
     * type filter gets cleared.
     */
    function clearFilter(){

        onPressButton()

        setFilter("none")

        closeFilterOverlay()

    }

    /**
     * @summary Confirms setting the currently selected type filter as the type to filter the pokedex by.
     * 
     * @description Runs when the 'Confirm' button is pressed which then applies the type filter to the pokedex, closes the type pop-up,
     * and updates the filter icon to show what type is currently being filtered by.
     */
    function confirmFilter(){

        onPressButton()

        setFilter(selectedType)

        closeFilterOverlay()

    }

    return (

    <TypeFilterModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <TypeFilterContainer>

            <TypeFilterBody>

                <TypeFilterHeader>Pokemon Types</TypeFilterHeader>

                <TypeContainer>

                    <TypeButton onPress={() => {selectTypeFilter("bug")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="bug"?3:0}} source={BugType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("dark")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="dark"?3:0}} source={DarkType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("dragon")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="dragon"?3:0}} source={DragonType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("electric")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="electric"?3:0}} source={ElectricType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fairy")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="fairy"?3:0}} source={FairyType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fighting")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="fighting"?3:0}} source={FightingType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fire")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="fire"?3:0}} source={FireType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("flying")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="flying"?3:0}} source={FlyingType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ghost")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="ghost"?3:0}} source={GhostType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("grass")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="grass"?3:0}} source={GrassType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ground")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="ground"?3:0}} source={GroundType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ice")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="ice"?3:0}} source={IceType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("normal")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="normal"?3:0}} source={NormalType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("poison")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="poison"?3:0}} source={PoisonType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("psychic")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="psychic"?3:0}} source={PsychicType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("rock")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="rock"?3:0}} source={RockType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("steel")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="steel"?3:0}} source={SteelType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("water")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage style={{borderRadius:90, borderColor:"#000000", borderWidth:selectedType=="water"?3:0}} source={WaterType}/>

                    </TypeButton>

                </TypeContainer>

                <FilterControls>

                    <ClearFilterButton onPress={() => {clearFilter()}} activeOpacity={1} underlayColor={'#ed1e24'}>

                        <ButtonLabel>Clear</ButtonLabel>

                    </ClearFilterButton>

                    <ConfirmFilterButton onPress={() => {confirmFilter()}} activeOpacity={1} underlayColor={'green'}>

                        <ButtonLabel>Confirm</ButtonLabel>
     
                    </ConfirmFilterButton>

                </FilterControls>

            </TypeFilterBody>

        </TypeFilterContainer>

    </TypeFilterModal>

  );
}

const TypeFilterModal = styled.Modal`
`

const TypeFilterContainer = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);
`

const TypeFilterBody = styled.View`

    width:80%
    height:90%
    background-color:#ffffff
    border-radius:20px
    border: 4px solid #000000
    align-items:center;

`

const TypeFilterHeader = styled.Text`

    font-family:PokemonStyle
    font-size:55px
    margin-top:10px

`

const TypeContainer = styled.View`

    width:90%
    margin-top:20px
    display:flex
    flex-wrap:wrap
    flex-direction:row
    justify-content:space-around

`

const TypeButton = styled.TouchableHighlight`

    width:80px
    height:80px
    margin-bottom:15px

`

const TypeImage = styled.Image`

    width:100%
    height:100%

`

const FilterControls = styled.View`

    width:96%
    height:8.7%
    display:flex
    flex-direction:row
    justify-content:space-between

`

const ClearFilterButton = styled.TouchableHighlight`

    width:49%
    height:100%
    background-color:#ed1e24
    border-bottom-left-radius:10px
    display:flex
    justify-content:center
    align-items:center

`

const ConfirmFilterButton = styled.TouchableHighlight`

    width:49%
    height:100%
    background-color:green
    border-bottom-right-radius:10px
    display:flex
    justify-content:center
    align-items:center

`

const ButtonLabel = styled.Text`

    font-family:PokemonStyle
    font-size:40px

`

export default TypeFilterModalComponent;
