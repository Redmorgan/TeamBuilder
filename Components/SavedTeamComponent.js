import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

// Components
import TeamMemberComponent from "./TeamMemberComponent";


const SavedTeamComponent = ({  }) => {

    async function onPressButton(){
        const { sound } = await Audio.Sound.createAsync(
          require('../audio/pressSound.mp3')
        );
        await sound.playAsync()
        Vibration.vibrate(5)
    }


    return (

    <SavedTeamContainer>

        <SavedTeamCard>

            <TeamRegionLabel>Team</TeamRegionLabel>

            <TeamPokemonContainer>

                {/* <TeamMemberComponent/>
                <TeamMemberComponent/>
                <TeamMemberComponent/>
                <TeamMemberComponent/>
                <TeamMemberComponent/>
                <TeamMemberComponent/> */}

            </TeamPokemonContainer>

        </SavedTeamCard>

    </SavedTeamContainer>

    );
}

const SavedTeamContainer = styled.View`

  width: 100%;
  height: 300px
  display: flex;
  align-items: center;
  background-color:blue

`

const SavedTeamCard = styled.View`

    width:90%
    height:240px
    border-top-left-radius:20px
    border-top-right-radius:20px
    border-bottom-left-radius:20px
    border-bottom-right-radius:20px
    align-items:center
    border: 2px solid #000000

`

const TeamRegionLabel = styled.Text`

    font-family:PokemonStyle
    font-size:40px
    height:40px

`

const TeamPokemonContainer = styled.View`

    width:100%
    height:180px
    background-color:green

`

export default SavedTeamComponent;
