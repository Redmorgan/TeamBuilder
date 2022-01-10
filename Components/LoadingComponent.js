/**
 * @fileoverview A component with a loading wheel that is used whilst data from pokeApi is being collected.
 */

import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

/**
 * @summary Loading wheel used when pokedex data is being collected from pokeApi
 * 
 * @returns A component containing loading text and a loading wheel
 */
const LoadingComponent = () => {

  return (

    <LoadingContainer>

        <ActivityIndicator style={{width:50, height:50}} color="#ed1e24" size="large"/>

        <LoadingLabel>Loading...</LoadingLabel>

    </LoadingContainer>

  );
}

const LoadingContainer = styled.View`

    width:100%
    display:flex
    align-items:center

`

const LoadingLabel = styled.Text`

  width:100%
  font-family:PokemonStyle
  text-align:center
  font-size:30px

`

export default LoadingComponent;