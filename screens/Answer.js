import React from "react";
import AppStyles from '../styles/AppStyles';
import { View, Button, Text, ImageBackground } from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import InlineTextButton from '../components/InlineTextButton';

export default function Answer({ navigation }) {
    const background = require("../assets/background1.jpg");
    
    return(
        <ImageBackground style={AppStyles.imageBG} source={background}>
            <HeaderRNE
            rightComponent={
            <InlineTextButton text="Xong" color="#000000" onPress={() => navigation.pop()}/>}
            centerComponent={{ text: 'Cá nhân hóa', style: AppStyles.header }}
        />
        </ImageBackground>
    );
}
