/**
 * @fileoverview This component is a pop-up that appears when a user tries to delete a team they have saved, that lets the user confirm if they want to delete the team or not.
 */
import React from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'
import { Entypo } from '@expo/vector-icons'; 

/**
 * @summary A pop-up that asks the user if they are sure they want to delete the currently selected team.
 * 
 * @param {Boolean}     state - The current open/close state of the modal.
 * @param {Function}    deleteTeam - The function used for deleting the team.
 * @param {Function}    closeDeleteModal - The function that opens/closes the delete team modal.
 *  
 * @returns A formatted modal.
 */
const DeleteTeamModalComponent = ({ state, deleteTeam, closeDeleteModal }) => {

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
     * @summary Deletes the currently selected team and closes the overlay
     * 
     * @description Runs when the 'Confirm' button is pressed in order to delete the currently selected team, once the team gets
     * deleted the delete overlay is then closed.
     */
    function confirmDeleteTeam(){

        onPressButton()

        deleteTeam()

        closeDeleteModal()

    }

    /**
     * @summary Closes the delete team overlay
     * 
     * @description Runs when the 'Cancel' button is pressed to close the currently opened delete team overlay without deleting
     * the currently selected team.
     */
    function closeOverlay(){

        onPressButton()

        closeDeleteModal(false)

    }

    return (

    <DeleteTeamModal
        visible={state}
        animationType='fade'
        transparent={true}>

        <DeleteTeamContainer>

            <DeleteTeamBody>

                <Entypo name="warning" size={80} color="#ed1e24" />

                <DeleteTeamHeader>Are you sure you want to delete this team?</DeleteTeamHeader>

                <ControlButtonsContainer>

                    <ConfirmButton onPress={() => {confirmDeleteTeam()}} underlayColor={'transparent'} activeOpacity={1}>

                        <Entypo name="check" size={50} color="black" />

                    </ConfirmButton>

                    <CancelButton onPress={() => {closeOverlay()}} underlayColor={'transparent'} activeOpacity={1}>
                        
                        <Entypo name="cross" size={50} color="black" />  
                        
                    </CancelButton>                    

                </ControlButtonsContainer>

            </DeleteTeamBody>

        </DeleteTeamContainer>

    </DeleteTeamModal>

  );
}

const DeleteTeamModal = styled.Modal`
`

const DeleteTeamContainer = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color: rgba(181,181,181,0.5);
`

const DeleteTeamBody = styled.View`

    width:80%;
    height:40%;
    background-color:#ffffff;
    border-radius:20px;
    border: 4px solid #000000;
    align-items:center;
    justify-content:center;

`

const DeleteTeamHeader = styled.Text`

    font-family:PokemonStyle;
    font-size:40px;
    margin-top:10px;
    text-align:center;

`

const ControlButtonsContainer = styled.View`

    height:20%;
    width:80%;
    display:flex;
    flex-direction:row;
    margin-top:6%;
    justify-content:space-between;

`

const ConfirmButton = styled.TouchableHighlight`

    width:48%;
    height:100%;
    justify-content:center;
    align-items:center;

`

const CancelButton = styled.TouchableHighlight`

    width:48%;
    height:100%;
    justify-content:center;
    align-items:center;

`

export default DeleteTeamModalComponent;
