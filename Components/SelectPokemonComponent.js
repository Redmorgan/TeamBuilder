import React, { useState }  from "react";
import { Vibration } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av'

// images
import BugType from '../images/types/Bug.png'
import DarkType from '../images/types/Dark.png'
import DragonType from '../images/types/Dragon.png'
import ElectricType from '../images/types/Electric.png'
import FairyType from '../images/types/Fighting.png'
import FightingType from '../images/types/Fighting.png'
import FireType from '../images/types/Fire.png'
import FlyingType from '../images/types/Flying.png'
import GhostType from '../images/types/Ghost.png'
import GrassType from '../images/types/Grass.png'
import GroundType from '../images/types/Ground.png'
import IceType from '../images/types/Ice.png'
import NormalType from '../images/types/Normal.png'
import PoisonType from '../images/types/Poison.png'
import PsychicType from '../images/types/Psychic.png'
import RockType from '../images/types/Rock.png'
import SteelType from '../images/types/Steel.png'
import WaterType from '../images/types/Water.png'

const SelectPokemonComponent = ({name, types, spriteURL}) => {

  async function onPressButton(){
    const { sound } = await Audio.Sound.createAsync(
      require('../audio/pressSound.mp3')
    );
    await sound.playAsync()
    Vibration.vibrate(5)
  }

  function expandPokemonData(){

    onPressButton()
    openPokemonData(!dataState)

  }

  var typeImages = []

  const [dataState, openPokemonData] = useState(false)

  for(var i = 0; i < types.length; i++){

    var type = types[i]

    if(type == "Bug"){

      typeImages.push(BugType)

    }else if(type == "Dark"){

      typeImages.push(DarkType)

    }else if(type == "Dragon"){

      typeImages.push(DragonType)

    }else if(type == "Electric"){

      typeImages.push(ElectricType)

    }else if(type == "Fairy"){

      typeImages.push(FairyType)

    }else if(type == "Fighting"){

      typeImages.push(FightingType)

    }else if(type == "Fire"){

      typeImages.push(FireType)

    }else if(type == "Flying"){

      typeImages.push(FlyingType)

    }else if(type == "Ghost"){

      typeImages.push(GhostType)

    }else if(type == "Grass"){

      typeImages.push(GrassType)

    }else if(type == "Ground"){

      typeImages.push(GroundType)

    }else if(type == "Ice"){

      typeImages.push(IceType)

    }else if(type == "Normal"){

      typeImages.push(NormalType)

    }else if(type == "Poison"){

      typeImages.push(PoisonType)

    }else if(type == "Psychic"){

      typeImages.push(PsychicType)

    }else if(type == "Rock"){

      typeImages.push(RockType)

    }else if(type == "Steel"){

      typeImages.push(SteelType)

    }else if(type == "Water"){

      typeImages.push(WaterType)

    }

  }

  return (

    <SelectPokemonTouchable onPress={() => {expandPokemonData()}} underlayColor={'transparent'} activeOpacity={1}>

      <SelectPokemonWrapper>

        <SelectPokemonRow>

          <PokemonNameLabel>{name}</PokemonNameLabel>

          <PokemonTypesContainer>

            <PokemonType source={typeImages[0]}/>

            {(types.length == 2)?<PokemonType source={typeImages[1]} style = {{marginLeft:5}}/>:null}

          </PokemonTypesContainer>

          <AddPokemonTouchable onPress={() => {onPressButton()}}>

            <AddPokemonIcon/>

          </AddPokemonTouchable>

        </SelectPokemonRow>
        
        {(dataState)?
        <SelectPokemonExpand>

          <PokemonSprite source={{uri:spriteURL}}/>

        </SelectPokemonExpand>:null}

      </SelectPokemonWrapper>

    </SelectPokemonTouchable>

  );
}

const SelectPokemonTouchable = styled.TouchableHighlight`

  width: 95%;
  margin-left:2.5%
  margin-bottom:2%

`;

const SelectPokemonWrapper = styled.View`

  width:100%

`

const SelectPokemonRow = styled.View`

  width: 100%
  height: 80px
  display: flex;
  align-items: center;
  flex-direction:row
  border: 3px solid #000000
  border-top-left-radius:20px
  border-bottom-left-radius:20px
  border-top-right-radius:90px
  border-bottom-right-radius:90px

`

const PokemonTypesContainer = styled.View`

  width:105px
  height:50px
  display: flex;
  flex-direction:row
  margin-left:10px

`

const PokemonNameLabel = styled.Text`

  font-size:45px
  font-family:PokemonStyle
  margin-left:10px
  width:45%

`

const PokemonType = styled.Image`

  height:50px
  width:50px
  border-radius:90px

`

const AddPokemonTouchable = styled.TouchableHighlight`

  width:50px
  height:50px
  border-radius:90px
  background-color:pink
  position:absolute
  right:15px

`

const AddPokemonIcon = styled.Image`

  width:100%
  height:100%

`

const SelectPokemonExpand = styled.View`

  width:88.5%
  height:140px
  margin-left:2%
  border-bottom-left-radius:20px
  border-bottom-right-radius:20px
  border-right-color:#000000
  border-left-color:#000000
  border-bottom-color:#000000
  border-right-width:3px
  border-left-width:3px
  border-bottom-width:3px
  display: flex;
  flex-direction:row
  align-items:center

`

const PokemonSprite = styled.Image`

  width:100px
  height:100px

`

export default SelectPokemonComponent;
