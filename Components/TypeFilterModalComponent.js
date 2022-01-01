import React, { useState, useEffect } from "react";
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
import pokedexIcon from '../images/pokedexIcon.png'
import pokeballsIcon from '../images/pokeballsIcon.png'

const TypeFilterModalComponent = ({ state, closeFilterOverlay, setFilter }) => {

    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)
    }

    const[selectedType, selectType] = useState()

    function selectTypeFilter(type){

        onPressButton()
        selectType(type)

    }

    function cancelFilter(){

        onPressButton()

        setFilter("none")

        closeFilterOverlay()

    }

    function confirmFilter(){

        onPressButton()

        //setFilter(selectedType)

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

                        <TypeImage source={BugType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("dark")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={DarkType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("dragon")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={DragonType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("electric")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={ElectricType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fairy")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={FairyType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fighting")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={FightingType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("fire")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={FireType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("flying")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={FlyingType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ghost")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={GhostType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("grass")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={GrassType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ground")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={GroundType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("ice")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={IceType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("normal")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={NormalType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("poison")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={PoisonType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("psychic")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={PsychicType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("rock")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={RockType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("steel")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={SteelType}/>

                    </TypeButton>

                    <TypeButton onPress={() => {selectTypeFilter("water")}} underlayColor={'transparent'} activeOpacity={1}>

                        <TypeImage source={WaterType}/>

                    </TypeButton>

                </TypeContainer>

                <FilterControls>

                    <ClearFilterButton onPress={() => {cancelFilter()}} activeOpacity={1} underlayColor={'#ed1e24'}>

                        <ButtonLabel>Cancel</ButtonLabel>

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
