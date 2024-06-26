import React from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/base";
import tw from "twrnc"
const data=[
    {
        id:"123",
        icon:"home",
        location:"Home",
        destination:"Code Street, London, UK"
    },
    {
        id:"456",
        icon:"wallet",
        location:"Work",
        destination:"London Eye, London, Uk",
    },
    
];


const NavFavorites = () => {

    
    return (
        <FlatList
        data={data}
        keyExtractor={(item)=>item.id}
        ItemSeparatorComponent={()=><View style={[tw`bg-gray-200 h-1`,{height:0.5}]}/>}
        renderItem={({item: {location, destination, icon}})=>(
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={icon}
                type="ioncon"
                color="white"
                size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>

            </TouchableOpacity>
        )}
        />
    );
};



export default NavFavorites
const style = StyleSheet.create({})