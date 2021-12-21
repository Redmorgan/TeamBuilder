import React, { useState } from "react";
import { Text, Vibration, Button } from "react-native";
import styled from "styled-components/native";

const StartScreen = ({ navigation: { navigate } }) => {

  return (

		<MainView>

      <Button title = "Start your adventure" onPress={() => {navigate('ProfessorIntro');}}> 

      </Button>

    </MainView>

  );
}

const MainView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  background-color:red;
`;

export default StartScreen;
