import React, { useEffect, useRef } from "react"
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "twrnc"
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"
const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null)

    useEffect(() => {
        if (!origin || !destination) return;
    
        // Calcula la región que abarca ambos puntos
        const minLat = Math.min(origin.location.lat, destination.location.lat);
        const maxLat = Math.max(origin.location.lat, destination.location.lat);
        const minLng = Math.min(origin.location.lng, destination.location.lng);
        const maxLng = Math.max(origin.location.lng, destination.location.lng);
    
        const region = {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: Math.abs(maxLat - minLat) * 1.2, // Ajusta el factor según tus preferencias
            longitudeDelta: Math.abs(maxLng - minLng) * 1.2,
        };
    
        // Establece la región en el mapa
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000); // Ajusta la duración según lo deseado
        }
    }, [destination]); // Solo se ejecutará cuando cambie el destino

    useEffect(()=>{
        if(!origin || !destination) return;
        const getTravelTime= async()=>{
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`).then((res)=>res.json()).then(data=>{
                console.log(data)
            });
        };
        getTravelTime();
    },[origin, destination, GOOGLE_MAPS_APIKEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"

                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    );
};



export default Map

const style = StyleSheet.create({})