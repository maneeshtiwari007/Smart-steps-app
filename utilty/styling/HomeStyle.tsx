import { StyleSheet } from "react-native";
import Colors from "../Colors";
import { convertArea } from "geolib";

export const HomeStyle = StyleSheet.create({
    bgHome: {
        justifyContent: 'center',
        flex:1,
    },
    progressBarGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBarCol: {
        width: (100 / 2 - 10) + '%',
    },
    progressBar: {
        height: 25,
        borderRadius: 30,
    },
    progressBarLabel: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageIcon: {
        width: 25,
        height: 25,
    },
    progressBarText: {
        marginLeft: 5,
        fontSize: Colors.FontSize.f14,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        color: Colors.white,
    },
    pedometerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-start",
    },
    pedometerCol: {
        alignItems: 'center',
    },
    pedometerContent: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    ImagePedometer: {
        width: '100%',
        height: 60,
    },
    pedometerText: {
        fontSize: Colors.FontSize.f20,
        fontFamily: 'Inter_700Bold',
        fontWeight: '700',
        color: Colors.white,
    },
    totalSpeed: {
        fontSize: Colors.FontSize.h1,
        fontFamily: 'Inter_700Bold',
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 10,
    },
    pedometerSpeed: {
        fontSize: Colors.FontSize.f20,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        color: Colors.white,
    },
    fontIcon: {
        color: Colors.white,
    },
    totaldistance: {
        fontSize: Colors.FontSize.f50,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        color: Colors.white,
    },
    textUnit: {
        fontSize: Colors.FontSize.f20,
        fontFamily: 'Inter_500Medium',
        fontWeight: '500',
        color: Colors.white,
    },
    walkingHourswrap: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageIcon2: {
        width: 50,
        height: 50,
    },
    walkingHours: {
        fontSize: Colors.FontSize.f30,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        color: Colors.white,
    },
    bgPattern: {
        zIndex:99
    },
    threeColLayout:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingBottom: 70,
        paddingTop: 30,
        alignItems: "center",
    },
    col3:{
        width: (100 / 3) + '%',
        alignItems: 'center',
    },
    imageIcon3:{
        width: 60,
        height: 60,
    },
    fontIcon2:{
        fontSize:100,
    }
});