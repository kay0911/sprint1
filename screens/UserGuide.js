import React from "react";
import AppStyles from '../styles/AppStyles';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { Header as HeaderRNE } from '@rneui/themed';
import InlineTextButton from '../components/InlineTextButton';

export default function UserGuide({ navigation }) {
    return(
        <SafeAreaView>
            <HeaderRNE
            rightComponent={
            <InlineTextButton text="Xong" color="#000000" onPress={() => navigation.pop()}/>}
            centerComponent={{ text: 'Hướng dẫn', style: AppStyles.header }}
        />
        </SafeAreaView>
    );
}
