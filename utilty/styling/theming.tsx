import { StyleSheet } from "react-native";
import Colors from "../Colors";

const Theming = StyleSheet.create({
    LayoutContainer: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        paddingTop: 0,
        marginBottom: 0
    },
    LoginLayoutContainer: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        paddingTop: 45,
    },
    MainHeaderLayoutContainer: {
        width: '100%',
        height: 45,
    },
    MainHeaderLayoutContent: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
        paddingLeft: 10,
        paddingBottom: 5,

    },
    headerRightIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerRightIcon: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeftUserIcon: {
        width: 30,
        height: 30,
        borderColor: Colors.light_crystal_blue,
        borderWidth: 2,
        borderRadius: 8
    },
    button: {
        backgroundColor: Colors.light_crystal_blue,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        text: {
            color: Colors.primary_color,
            fontSize: Colors.FontSize.f17
        },
        disable: {
            backgroundColor: Colors.light_crystal_blue_disable,
        }
    },
    buyButton: {
        backgroundColor: Colors.light_crystal_blue,
        height: 35,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        text: {
            color: Colors.primary_color,
            fontSize: Colors.FontSize.f14
        },
        disable: {
            backgroundColor: Colors.light_crystal_blue_disable,
        }
    },
    LoginScreen: {
        backgroundColor: Colors.primary_color,
        header: {
            backgroundColor: Colors.circleColor,
            borderBottomLeftRadius: 100,
            width: '100%',
        }
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 150
    },
    productImage: {
        width: '100%',
        height: '100%'

    },
    errorContainer: {
        marginBottom: 5,
        left: 5
    },
    inputError: {
        color: Colors.errorColor
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10
    },
    card: {
        minHeight: 250,
        borderRadius: 18,
        backgroundColor: Colors.ligtest_gray,
        width: '48%',
        marginBottom: '4%',
        cardTitle: {
            fontSize: 14,
            color: Colors.light_crystal_blue
        }
    },
    lottie: {
        width: 100,
        height: 100,
    },
    passwordInActiveField: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.white,
        marginLeft: 12,
        marginRight: 10
    },
    modal: {
        alignItems: 'center',
        bottom: 0,
        left: 0,
        minHeight: '100%',
        backgroundColor: Colors.primary_color,
        width: '100%',
        top:0
    },
    numPad: {
        marginBottom: 15,
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    pTagWhite:{
        color:Colors.white,
        fontSize:Colors.FontSize.f12,
        marginBottom:5
    }

});
export default Theming;