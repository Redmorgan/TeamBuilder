import React, { useState, useEffect } from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Images
import BackArrow from '../images/BackArrow.png'

// Components
import SavedTeamComponent from "../Components/SavedTeamComponent";



const TeamsViewerScreen = ({ navigation }) => {

    const[teamsData, setTeamsData] = useState([])
    const[isLoaded, setLoading] = useState(false)

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

    const fetchAllItems = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const items = await AsyncStorage.multiGet(keys)

            console.log(items)

            setTeamsData(items)
        } catch (error) {
            console.log(error, "problemo")
        }
    }

    async function deleteTeam(key){

        try {
            await AsyncStorage.removeItem(key);
            fetchAllItems()
        }
        catch(exception) {
            console.log("Error deleting team: " + exception);
        }

    }

    function editTeam(region, game, team, teamID){

        navigation.push('SelectTeam', {region:region, game:game, selectedTeam:team, teamID:teamID})

    }

    // // TESTING FUNCTION - REMOVE ON COMPLETION
    // const clearAsyncStorage = async() => {
    //     AsyncStorage.clear();
    // }

    // //clearAsyncStorage()

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

const TeamsFlatlist = styled.FlatList`

    width:100%
    background-color:#F5F5F5
    padding-top:10px

`

export default TeamsViewerScreen;
