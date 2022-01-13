/**
 * @fileoverview Team viewer page where users are able to view all the teams they have created, as well as being able to edit, delete, and share them.
 */

import React, { useState } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import BackArrow from '../images/BackArrow.png'

// Components
import SavedTeamComponent from "../Components/SavedTeamComponent";

/**
 * @summary Component displaying all the teams a user has created, as well as controls to manage these teams.
 * 
 * @param {Function} navigation - Passed through navigation function for navigation between stacks. 
 *  
 * @returns Page displaying all the teams the user has already created.
 */
const TeamsViewerScreen = ({ navigation }) => {

    const[teamsData, setTeamsData] = useState([])
    const[isLoaded, setLoading] = useState(false)

    /**
     * @summary Plays a "select" sound effect.
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
     * @summary Takes the user back to the home screen.
     * 
     * @description When the back button is pressed the stack view is popped which takes the user back to the home screen.
     */
    function gotoHome(){

        onPressButton()

        navigation.pop()

    }

    /**
     * @summary Collects all the saved teams from the async storage.
     * 
     * @description Collects the keys for all of the saved teams and uses them to collect a list of all of the saved teams
     * in the async storage which are then set to the useState teamsData which gets loaded onto the page.
     */
    const fetchAllItems = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const items = await AsyncStorage.multiGet(keys)

            setTeamsData(items)
        } catch (error) {
            console.log(error, "Error collecting team data.")
        }
    }

    /**
     * @summary Removes the selected team from the local storage.
     * 
     * @param {String} key - Key of the team being removed from the local storage.
     * 
     * @description Takes the key passed into the function and uses it to find the related record in the local storage, that record
     * is then deleted from the local storage. After this the team data is fetched again in order to refresh the page and remove
     * the deleted record from the flat list.
     */
    async function deleteTeam(key){

        try {
            await AsyncStorage.removeItem(key);
            fetchAllItems()
        }
        catch(error) {
            console.log(error, "Error deleting team.");
        }

    }

    /**
     * 
     * @param {String} region - The region of the selected team.
     * @param {String} game - The game in which the selected team is a part of.
     * @param {Object List} team - List of objects that containt the pokemon that are part of the team. 
     * @param {String} teamID - The ID of the team record in async storage.
     */
    function editTeam(region, game, team, teamID){

        navigation.push('SelectTeam', {region:region, game:game, selectedTeam:team, teamID:teamID})

    }

    if(isLoaded == false){

        fetchAllItems()

        setLoading(true)

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

        {(teamsData == null || teamsData.length == 0)? 
        
        <NoTeamContainer>

          <NoTeamText>You haven't got any teams yet, to get started press the NEW GAME button on the home screen.</NoTeamText>

        </NoTeamContainer>:null}

        <TeamsFlatlist
            data={teamsData}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (<SavedTeamComponent teamData={item} deleteTeam={deleteTeam} editTeamData={editTeam}/>)}
            contentContainerStyle={{paddingBottom:10}}/>

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

  width:100%;
  height:100px;
  background-color:#ed1e24;
  border-bottom-width: 4px;
  border-bottom-color: #000000;
  display:flex;
  justify-content:center;
  align-items:center;

`

const HeaderLabel = styled.Text`

  font-family:PokemonStyle;
  font-size:60px;

`

const BackArrowButton = styled.TouchableHighlight`

    width:50px;
    height:50px;
    position:absolute;
    z-index:4;
    top:25px;
    left:10px;

`

const BackArrowImage = styled.Image`

    width:100%;
    height:100%;

`

const TeamsFlatlist = styled.FlatList`

    width:100%;
    background-color:#F5F5F5;
    padding-top:10px;

`

const NoTeamContainer = styled.View`

    margin-top:20px;
    width:95%;
    align-items:center;

`

const NoTeamText = styled.Text`

  font-family:PokemonStyle;
  font-size:45px;
  text-align:center;

`

export default TeamsViewerScreen;
