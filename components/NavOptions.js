import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React from 'react'
import { Text, View, SafeAreaView ,Image, FlatList, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectOrigin } from '../slices/navSlice';


const data=[
    {
        id:"123",
        title:"Pedir servicio",
        Image:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
        screen:"MapScreen",
        type:"service"
    },
    {
        id:"456",
        title:"Entregas",
        Image:"https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png",
        screen:"MapScreen",
        type:"delivery"
    }
];
const NavOptions = () => {

    const navigation=useNavigation();
    const origin =useSelector(selectOrigin);
    return (
        <FlatList
         data={data}
         horizontal
         keyExtractor={(item)=>item.id}
         renderItem={({item})=>(
            <TouchableOpacity 
                onPress={()=>navigation.navigate(item.screen,{type:item.type}   )}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                disabled={item.type === "service" && !origin} // Solo deshabilita "Pedir servicio" si no hay origin 
                >
                  
                <View style={tw`${item.type === "service" && !origin ? "opacity-20" : ""}`}>
                    <Image
                      style= {{width:120, height:120,resizeMode:"contain"}}
                      source={{uri:item.Image}}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon 
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    name="arrowright" color ="white" type="antdesign"/>
                </View>
            </TouchableOpacity>
         )}
        />
    )
}

export default NavOptions

