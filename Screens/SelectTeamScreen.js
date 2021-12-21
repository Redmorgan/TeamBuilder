import React, { useState } from "react";
import { Text, Vibration, Button } from "react-native";
import styled from "styled-components/native";

const SelectTeamScreen = ({ navigation: { navigate } }) => {
  return (

    <MainView>

      <Button title = "Select Team"> 

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

export default SelectTeamScreen;
