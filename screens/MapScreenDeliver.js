import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from "twrnc"
import Map from "../components/Map"
import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideOptionsCard from '../components/RideOptionsCard';
import NavigateCard from '../components/NavigateCard';
import { Icon } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import PendingOrders from '../components/PendingOrders';



const MapScreenDeliver = () => {

    const Stack = createNativeStackNavigator();
    const navigation=useNavigation();
    const route=useRoute()

    // Recibe el parámetro "type" para determinar el contexto (Pedir Servicio o Entregas)
    const { type } = route.params || {}; // Puede ser "service" o "delivery"
    return (
        <View>
            
            <TouchableOpacity
                onPress={()=>navigation.navigate("HomeScreen")}
                style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                
                <Icon name='menu'/>
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                {type === "service" && (
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
                    {type === "service" && (
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    )}
                    {type === "delivery" && (
                    <Stack.Screen
                        name="PendingOrders"
                        component={PendingOrders}
                        options={{
                            headerShown: false,
                        }}
                    />
                    )}
                    

                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreenDeliver
const styles = StyleSheet.create({});