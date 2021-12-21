import React, { useState } from "react";
import { Text, Vibration, Button } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


// Components
import SelectGameComponent from "../Components/SelectGameComponent";

//images
import SelectBackground from '../images/SelectBackground.png'
import SelectGameContainer from '../images/SelectGameContainer.png'

//logos
import Red from '../images/logos/Red.png'
import Blue from '../images/logos/Blue.png'
import Yellow from '../images/logos/Yellow.png'

const SelectGameScreen = ({ navigation: { navigate } }) => {

    async function onPressSound(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
      }

    const [selectionState, selectGame] = useState("none");

    function returnToIntro(){

        onPressSound();
        console.log(selectionState)
        navigate('ProfessorOutro', {selectedGame:selectionState})

    }

  return (

    <MainView>

      <Background source={SelectBackground}>

        <GameContainer source={SelectGameContainer} resizeMode="contain">

            <GameScrollContainer>

                <GameScroll>

                    <SelectGameComponent logoImg = {Red} onPress={selectGame} game={"red"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Blue} onPress={selectGame} game={"blue"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Yellow} onPress={selectGame} game={"yellow"} selectedGame = {selectionState}/>

                </GameScroll>

            </GameScrollContainer>

        </GameContainer>

        {(selectionState != "none")?
        <ConfirmGameButton onPress={() => {returnToIntro()}} underlayColor={'#c7e8f4'} activeOpacity={1}>

            <ConfirmText>Confirm Selection</ConfirmText>    
            
        </ConfirmGameButton>: null}        

      </Background>

    </MainView>

  );
}

const MainView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Background = styled.ImageBackground`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
`

const GameContainer = styled.ImageBackground`
    width:90%;
    height:80%;
    display: flex;
    align-items: center;
    margin-top:15%
`

const GameScrollContainer = styled.View`
    width:90%
    height:85%
    margin-top:20%

`

const GameScroll = styled.ScrollView`
    width:100%

`

const ConfirmGameButton = styled.TouchableHighlight`

    width:75%
    height:10%
    margin-top:12px
    background-color:#c7e8f4;
    border-radius:10px
    border: 3px solid #a3cede
    display: flex;
    align-items: center;
    justify-content:center;

`

const ConfirmText = styled.Text`

    font-size:30px

`

export default SelectGameScreen;
