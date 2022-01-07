import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'

// Images
import BackArrow from '../images/BackArrow.png'


const TeamsViewerScreen = ({ navigation }) => {

    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)
      }

    function gotoHome(){

        onPressButton()

        navigation.push('Start')

    }

    return (

    <MainView>

        <StatusBar backgroundColor="#ed1e24" style="inverted" />

        <ViewTeamsHeader>

        <BackArrowButton onPress={() => {gotoHome()}} underlayColor={'transparent'} activeOpacity={1}>

            <BackArrowImage source={BackArrow}/>

        </BackArrowButton>

        <HeaderLabel>My Teams</HeaderLabel>

        </ViewTeamsHeader>

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

const ViewTeamsHeader = styled.View`

  width:100%
  height:100px
  background-color:#ed1e24
  border-bottom-width: 4px;
  border-bottom-color: #000000
  display:flex
  justify-content:center
  align-items:center

`

const HeaderLabel = styled.Text`

  font-family:PokemonStyle
  font-size:60px

`

const BackArrowButton = styled.TouchableHighlight`

    width:50px
    height:50px
    position:absolute
    z-index:4
    top:25px
    left:10px

`

const BackArrowImage = styled.Image`

    width:100%;
    height:100%;

`

export default TeamsViewerScreen;