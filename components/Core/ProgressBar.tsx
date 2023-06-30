import React, { useEffect, useState, useRef } from 'react';
import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import Colors from '../../utilty/Colors';

interface PropsData {
    label: string;
    stokesWidth?: any;
    activeBackgroundColor?: any;
    isMultiState?: boolean
    numberOfState?: any
}
const ProgressBar = (props: PropsData) => {
    var backGroundColor = (props?.activeBackgroundColor) ? props.activeBackgroundColor : Colors.Gray;
    const textWidth = (props?.stokesWidth > 30) ? props?.stokesWidth : '30%';
    const stokesRadius = (props?.stokesWidth > 96) ? 25 : 0;
    const numberObject = new Array(props?.numberOfState).fill(0);
    return (
        <View style={[styles.container]}>
            <View style={styles.progressBar}>
                {props?.label &&
                    <View style={{ zIndex: 1, alignItems: 'center', height: '100%', justifyContent: 'center', display: 'flex', left: 5, width: textWidth + '%' }}>
                        <Text>{props?.label}</Text>
                    </View>
                }
                {!props?.isMultiState &&
                    <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: backGroundColor, width: (props?.stokesWidth) ? props?.stokesWidth + '%' : 0, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderRadius: stokesRadius }]} />
                }
                <View style={{ flexDirection: 'row', top: 0, minHeight: 31, width: '100%', position: 'absolute' }}>
                    {props?.isMultiState && numberObject?.map((item, index) => {
                        const radiusonFirst = (index===0)?{borderTopLeftRadius: 25, borderBottomLeftRadius: 25}:{borderRightWifth:1};
                        const radiusonLast = (index===(props?.numberOfState-1))?{borderTopRightRadius: 25, borderBottomRightRadius: 25}:{};
                        return (
                            <View key={index} >
                                <View key={index} style={[{ width: 100/props?.numberOfState+'%', borderColor: 'white', borderWidth: 1, backgroundColor: Colors?.ligtest_gray },radiusonFirst,radiusonLast]}></View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    );
}

export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column", //column direction
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    progressBar: {
        minHeight: 35,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 25,
    }
});