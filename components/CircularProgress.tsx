import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../utilty/Colors';
/**
* Override styles that get passed from props
**/
const propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform:[{rotateZ: `${rotateBy}deg`}]
  };
}

const renderThirdLayer = (percent,size,params) => {
  if(percent > 50){
    /**
    * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
    * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
    * before passing to the propStyle function
    **/
    return <View style={[styles(size,params).secondProgressLayer,propStyle((percent - 50), 45)]}></View>
  }else{
    return <View style={styles(size,params).offsetLayer}></View>
  }
}

const CircularProgress = ({percent,childen,style,size,ParamsChild,ParamsParent,percentChild}) => {
  let firstProgressLayerStyle;
  let ChildProgressLayerStyle;
  if(percent > 50){
      firstProgressLayerStyle = propStyle(50, -135);
  }else {
      firstProgressLayerStyle = propStyle(percent, -135);
  }
  if(percentChild > 50){
      ChildProgressLayerStyle = propStyle(50, -135);
  }else {
      ChildProgressLayerStyle = propStyle(percentChild, -135);
  }
  
  return(
    <View style={[styles(size,ParamsParent).container,style]}>
      <View  style={{ paddingLeft:5,paddingTop:4,paddingBottom:4,paddingRight:5,position:'absolute',zIndex:1,top:-25,backgroundColor:Colors.light_crystal_blue,borderRadius:'50%',width:22,height:22 }}>
        <FontAwesome5 name="coins" size={12} color="black" />
      </View>
      <View style={[styles(size,ParamsParent).firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent,size,ParamsParent)}
      
      <View style={[styles(ParamsChild?.size,ParamsChild).container,style]}>
        <View  style={{ paddingLeft:5,paddingTop:2,paddingBottom:2,paddingRight:5,position:'absolute',zIndex:1,top:-25,backgroundColor:Colors.white,borderRadius:'50%',width:25,height:25 }}>
          <MaterialCommunityIcons name="shoe-cleat" size={20} color="black" />
        </View>
        <View style={[styles(ParamsChild?.size,ParamsChild).firstProgressLayer, ChildProgressLayerStyle]}></View>
        {renderThirdLayer(percentChild,ParamsChild?.size,ParamsChild)}
        {childen}
        <View style={{ alignItems:'center',justifyContent:'center' }}>
          <View>
            <Text style={{ color:Colors.white,fontSize:Colors.FontSize.f50 }}>0</Text>
          </View>
          <View><Text  style={{ color:Colors.white,fontSize:Colors.FontSize.f20 }}>of 2000 steps</Text></View>
        </View>
      </View>

    </View>
  );
}

const styles =(size,params:any)=> StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderWidth: 25,
    borderRadius: size/2,
    borderColor: (params?.inactiveColor)?params?.inactiveColor:'grey',
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative',
    backgroundColor:'#222323',
  },
  firstProgressLayer: {
    width: size,
    height: size,
    borderWidth: 25,
    borderRadius: size/2,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: (params?.activeColor)?params?.activeColor:'#3498db',
    borderTopColor: (params?.activeColor)?params?.activeColor:'#3498db',
    transform:[{rotateZ: '-135deg'}],
    
  },
  secondProgressLayer:{
    width: size,
    height: size,
    position: 'absolute',
    borderWidth: 25,
    borderRadius: size/2,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: (params?.activeColor)?params?.activeColor:'#3498db',
    borderTopColor: (params?.activeColor)?params?.activeColor:'#3498db',
    transform: [{rotateZ: '45deg'}],
    
  },
  offsetLayer: {
    width: size,
    height: size,
    position: 'absolute',
    borderWidth: 25,
    borderRadius: size/2,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: (params?.inactiveColor)?params?.inactiveColor:'grey',
    borderTopColor: (params?.inactiveColor)?params?.inactiveColor:'grey',
    transform:[{rotateZ: '-135deg'}],
    
  },
});

export default CircularProgress;