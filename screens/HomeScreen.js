import React from 'react'
import { StyleSheet, Text, View, SafeAreaView ,Image} from 'react-native'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { setDestination,setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavorites from '../components/NavFavorites';



const HomeScreen = () => {
    const dispatch= useDispatch();
    return (
        <SafeAreaView style={[tw`bg-white h-full`]}>
           <View style={tw`p-5`}>
                <Image
                    style={{
                        width:100,
                        height:100,
                        resizeMode:"contain",
                    }}
                    source={{
                        uri:"https://1000marcas.net/wp-content/uploads/2019/12/UBER-Logo.jpg",
                    }}
                    />
                
                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    styles={{
                        container:{
                            flex:0,

                        },
                        textInput:{
                            fontSize:18,
                        },
                    }}
                    onPress={(data, details = null)=>{
                        
                        dispatch(
                            setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }));

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language:'es',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                
                />
                    
                <NavOptions/>
                <NavFavorites/>
           </View>

            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
    }
});