import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'


// Components
import SelectGameComponent from "../Components/SelectGameComponent";

// Images
import SelectBackground from '../images/SelectBackground.png'
import SelectGameContainer from '../images/SelectGameContainer.png'

// Logos
import Red from '../images/logos/Red.png'
import Blue from '../images/logos/Blue.png'
import Yellow from '../images/logos/Yellow.png'
import Gold from '../images/logos/Gold.png'
import Silver from '../images/logos/Silver.png'
import Crystal from '../images/logos/Crystal.png'
import Ruby from '../images/logos/Ruby.png'
import Sapphire from '../images/logos/Sapphire.png'
import Emerald from '../images/logos/Emerald.png'
import Pearl from '../images/logos/Pearl.png'
import Diamond from '../images/logos/Diamond.png'
import Platinum from '../images/logos/Platinum.png'
import Black from '../images/logos/Black.png'
import White from '../images/logos/White.png'

const SelectGameScreen = ({ navigation }) => {


    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)

      }

    const [selectionState, selectGame] = useState("none");

    function gotoOutro(){

        onPressButton();
        navigation.push('ProfessorOutro', {selectedGame:selectionState})

    }

  return (

    <MainView>

      <Background source={SelectBackground}>

        <GameContainer source={SelectGameContainer} resizeMode="contain">

            <GameScrollContainer>

                <GameScroll contentContainerStyle={{borderRadius:10, overflow:'hidden'}}>

                    {/* Generation 1 */}
                    <SelectGameComponent logoImg = {Red} onPress={selectGame} game={"red"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Blue} onPress={selectGame} game={"blue"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Yellow} onPress={selectGame} game={"yellow"} selectedGame = {selectionState}/>
                    
                    {/* Generation 2 */}
                    <SelectGameComponent logoImg = {Gold} onPress={selectGame} game={"gold"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Silver} onPress={selectGame} game={"silver"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Crystal} onPress={selectGame} game={"crystal"} selectedGame = {selectionState}/>

                    {/* Generation 3 */}
                    <SelectGameComponent logoImg = {Ruby} onPress={selectGame} game={"ruby"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Sapphire} onPress={selectGame} game={"sapphire"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Emerald} onPress={selectGame} game={"emerald"} selectedGame = {selectionState}/>

                    {/* Generation 4 */}
                    <SelectGameComponent logoImg = {Pearl} onPress={selectGame} game={"pearl"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Diamond} onPress={selectGame} game={"diamond"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {Platinum} onPress={selectGame} game={"platinum"} selectedGame = {selectionState}/>

                    {/* Generation 5 */}
                    <SelectGameComponent logoImg = {Black} onPress={selectGame} game={"black"} selectedGame = {selectionState}/>
                    <SelectGameComponent logoImg = {White} onPress={selectGame} game={"white"} selectedGame = {selectionState}/>

                </GameScroll>

            </GameScrollContainer>

        </GameContainer>

        {(selectionState != "none")?
        <ConfirmGameButton onPress={() => {gotoOutro()}} underlayColor={'#c7e8f4'} activeOpacity={1}>

            <ConfirmText style={{fontFamily:"PokemonStyle"}}>Confirm Selection</ConfirmText>    
            
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
  height:90%
  margin-top:15.2%
  border-radius:10px

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

    font-size:45px

`

export default SelectGameScreen;
