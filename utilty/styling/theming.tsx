import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";

const Theming = StyleSheet.create({
    LayoutContainer: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingTop: 0,
        marginBottom: 0
    },
    LayoutContainerLight: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingTop: 0,
        marginBottom: 0
    },
    LoginLayoutContainer: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingTop: 45,
    },
    MainHeaderLayoutContainer: {
        width: '100%',
        height: 55
    },
    MainHeaderLayoutContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,

    },
    headerRightIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',    
    },
    iconStyle:{
        width: 38,
        height: 38,
        borderColor: Colors.primary_color,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#ffcc00',
        justifyContent: "center",
        alignItems: "center",    
        position: "relative",   
        flexDirection: "row",
        fontSize: Colors.FontSize.f14,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
    },
    headerRightIcon: {
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLeftUserIcon: {
        width: 38,
        height: 38,
        borderColor: Colors.primary_color,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",    
        position: "relative",   
        flexDirection: "row",
    },
    badgeWarning: {
        fontSize: 7,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600',
        backgroundColor: '#ffcc00',
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 50,
        position: "absolute",
        bottom: -5,
        left: 0,
        width: '100%',
        textAlign: "center",
        zIndex: 99, 
        justifyContent: "center",
        alignItems: "center", 
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
        borderColor:Colors.primary_color,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: Colors.ligtest_gray,
        width: '48%',
        marginBottom: '4%',
        cardTitle: {
            fontSize: 10,
            textTransform: 'capitalize',
            color: Colors.light_crystal_blue,
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
        borderColor: Colors.purpule,
        marginLeft: 12,
        marginRight: 10
    },
    modal: {
        alignItems: 'center',
        backgroundColor: Colors.backGroundColor,
        width: '100%',
        height:Dimensions.get('window').height-100,
        justifyContent:'center'
    },
    numPad: {
        marginBottom: 15,
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.purpule,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    pTagWhite: {
        color: Colors.white,
        fontSize: Colors.FontSize.f12,
        marginBottom: 5
    },
    headerMiddileIcon: {
        width: 58,
        height: 32,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",    
        position: "relative",   
        flexDirection: "row",
        backgroundColor:Colors.secondColor
    },
    networkBody:{ 
        flex:1,
        backgroundColor:Colors.backGroundColor 
    },
    networkContainer:{ 
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    networkTitle:{
        fontSize:Colors.FontSize.f17,
        fontWeight:'bold',
        color:'#000',
        marginBottom:15
    },
    networkSubTitle:{
        fontSize:Colors.FontSize.f14,
        color:Colors.light_black,
        width:'70%',
        textAlign:'center'

    }

});
export default Theming;