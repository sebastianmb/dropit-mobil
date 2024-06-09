import React from 'react'
import { StyleSheet, Text, View, SafeAreaView ,Image} from 'react-native'
import tw from 'twrnc';

const HomeScreen = () => {
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
                    }}/>
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