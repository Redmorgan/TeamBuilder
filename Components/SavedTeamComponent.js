/**
 * @fileoverview Component for the trainer card that displays one of the users saved teams as well as control options for that team.
 */

import React, { useState, useRef } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

// Components
import TeamMemberComponent from "./TeamMemberComponent";
import DeleteTeamModalComponent from "./DeleteTeamModal";

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

/**
 * @param {Object List} teamData - List of objects containing data about the pokemon in the team.
 * @param {Function}    deleteTeam - Function to delete the selected team from async storage.
 * @param {Function}    editTeamData - Function to take the user to the team builder to edit their team.
 *  
 * @returns Formatted trainer card with all the pokemon in that particular team. 
 */
const SavedTeamComponent = ({ teamData, deleteTeam, editTeamData }) => {

    const viewRef = useRef()

    const[gameLogo, setGameLogo] = useState()
    const[deleteState, setDeleteState] = useState(false)

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
     * @summary Lets the user share an image of their saved pokemon team
     * 
     * @description Using the 'share' feature on mobile apps the user is able to share a picture of their saved pokemon team to their
     * friends and to social media. The app gets temporarily suspended whilst the share overlay is active.
     */
    async function shareTeam(){

        onPressButton()

        try{

            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 1
            })

            await Sharing.shareAsync(uri)

        } catch(err){

            console.error("Error sharing image: " + err)

        }

    }

    /**
     * @summary Sets the game logo image based off the inputted game name.
     * 
     * @param {String} game - Pokemon game name 
     */
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

    /**
     * @summary Opens the delete team pop-up.
     * 
     * @description Runs when the 'Delete' button in order to open the overlay that lets the user
     * confirm they want to delete the currently selected team.
     */
    function openDeleteModal(){

        onPressButton()

        setDeleteState(true)

    }

    /**
     * @summary Removes the currently selected team from the async storage.
     * 
     * @description Runs when the 'Confirm' button on the DeleteTeamModal is pressed which will remove
     * the team from async storage, closing the overlay, and refreshing the page to remove the deleted team.
     */
    function removeTeam(){

        onPressButton()

        deleteTeam(teamData[0])

    }

    /**
     * @summary Takes the user back to the team builder so they can edit their team.
     */
    function editTeam(){

        onPressButton()

        editTeamData(team.region, team.game, team.team, teamData[0])

    }

    var team = JSON.parse(teamData[1])

    if(gameLogo == null){
        getGameLogo(team.game)
    }
    
    return (

    <SavedTeamContainer>

        <DeleteTeamModalComponent state={deleteState} deleteTeam={removeTeam} closeDeleteModal={setDeleteState}/>

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

            <TeamControlButton onPress={() => {editTeam()}}  underlayColor={'#c2191e'} activeOpacity={1}>

                <ButtonLabel>Edit</ButtonLabel>

            </TeamControlButton >

            <TeamControlButton onPress={() => {shareTeam()}} underlayColor={'#c2191e'} activeOpacity={1}>

                <ButtonLabel>Share</ButtonLabel>

            </TeamControlButton>

            <TeamControlButton onPress={() => {openDeleteModal()}} underlayColor={'#c2191e'} activeOpacity={1}>

                <ButtonLabel>Delete</ButtonLabel>

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
