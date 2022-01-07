import React, { useState, useEffect, useRef } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

// Components
import TeamMemberComponent from "./TeamMemberComponent";

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


const SavedTeamComponent = ({ teamData, deleteTeam }) => {

    const viewRef = useRef()

    const[gameLogo, setGameLogo] = useState()

    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)
    }

    async function shareTeam(){

        onPressButton()

        try{

            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.7
            })

            await Sharing.shareAsync(uri)

        } catch(err){

            console.error("Error sharing image: " + err)

        }

    }

    function getGameLogo(game){

        if(game == "red"){

            setGameLogo(Red)

        }else if(game == "blue"){
    
            setGameLogo(Blue)
            
        }else if(game == "yellow"){
    
            setGameLogo(Yellow)

        }else if(game == "gold"){
    
            setGameLogo(Gold)
            
        }else if(game == "silver"){
    
            setGameLogo(Silver)
            
        }else if(game == "crystal"){
    
            setGameLogo(Crystal)

        }else if(game == "ruby"){
    
            setGameLogo(Ruby)
            
        }else if(game == "sapphire"){
    
            setGameLogo(Sapphire)

        }else if(game == "emerald"){
    
            setGameLogo(Emerald)
            
        }else if(game == "pearl"){
    
            setGameLogo(Pearl)

        }else if(game == "diamond"){
    
            setGameLogo(Diamond)
            
        }else if(game == "platinum"){
    
            setGameLogo(Platinum)
            
        }else if(game == "black"){
    
            setGameLogo(Black)
            
        }else if(game == "white"){
    
            setGameLogo(White)
            
        }

    }

    function removeTeam(){

        onPressButton()

        deleteTeam(teamData[0])

    }

    var team = JSON.parse(teamData[1])

    if(gameLogo == null){
        getGameLogo(team.game)
    }
    
    return (

    <SavedTeamContainer>

        <SavedTeamCard ref={viewRef}>

            <TeamRegionLabel>{team.game[0].toUpperCase() + team.game.substring(1)} Team</TeamRegionLabel>

            <TeamPokemonContainer>

                {(team.team.length >= 1)? <TeamMemberComponent pokemon={team.team[0]} readOnly={true}/>:null}
                {(team.team.length >= 2)? <TeamMemberComponent pokemon={team.team[1]} readOnly={true}/>:null}
                {(team.team.length >= 3)? <TeamMemberComponent pokemon={team.team[2]} readOnly={true}/>:null}
                {(team.team.length >= 4)? <TeamMemberComponent pokemon={team.team[3]} readOnly={true}/>:null}
                {(team.team.length >= 5)? <TeamMemberComponent pokemon={team.team[4]} readOnly={true}/>:null}
                {(team.team.length >= 6)? <TeamMemberComponent pokemon={team.team[5]} readOnly={true}/>:null}

            </TeamPokemonContainer>

            <BackgroundLogoImage resizeMode="contain" source={gameLogo}/>

        </SavedTeamCard>

        <TeamControls>

            <TeamControlButton underlayColor={'transparent'} activeOpacity={1}>

                <ButtonLabel>Edit</ButtonLabel>

            </TeamControlButton >

            <TeamControlButton onPress={() => {removeTeam()}} underlayColor={'#ed1e24'} activeOpacity={1}>

                <ButtonLabel>Delete</ButtonLabel>

            </TeamControlButton>

            <TeamControlButton onPress={() => {shareTeam()}} underlayColor={'#ed1e24'} activeOpacity={1}>

                <ButtonLabel>Share</ButtonLabel>

            </TeamControlButton>

        </TeamControls>

    </SavedTeamContainer>

    );
}

const SavedTeamContainer = styled.View`

  width: 100%;
  height: 325px
  display: flex;
  align-items: center;
  background-color:transparent

`

const SavedTeamCard = styled.View`

    width:90%
    height:265px
    border-top-left-radius:20px
    border-top-right-radius:20px
    border-bottom-left-radius:20px
    border-bottom-right-radius:20px
    align-items:center
    border: 2px solid #000000
    background-color:#ffffff

`

const TeamRegionLabel = styled.Text`

    font-family:PokemonStyle
    font-size:40px
    height:40px
    border-bottom-width:2px
    border-bottom-color:#000000
    width:100%
    text-align:center
    background-color:#ed1e24
    border-top-left-radius:18px
    border-top-right-radius:18px

`

const TeamPokemonContainer = styled.View`

    width:100%
    height:185px
    display:flex
    flex-wrap:wrap
    flex-direction:row

`

const BackgroundLogoImage = styled.Image`

    width:80%
    z-index:-1
    position:absolute
    top:40px
    opacity:0.2

` 

const TeamControls = styled.View`

    width:90%
    height:45px
    margin-top:5px
    display:flex
    flex-direction:row
    justify-content:space-around

`

const TeamControlButton = styled.TouchableHighlight`

    height:100%
    width:30%
    background-color:#ed1e24
    justify-content:center
    align-items:center
    border: 2px solid #000000
    border-top-left-radius:10px
    border-top-right-radius:10px
    border-bottom-left-radius:10px
    border-bottom-right-radius:10px

`

const ButtonLabel = styled.Text`

    font-family:PokemonStyle
    font-size:30px

`

export default SavedTeamComponent;
