import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc"
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation, selectWaypoints } from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env"

import { Icon } from '@rneui/themed';

import * as Location from 'expo-location'; // Importa expo-location



const MapDeliver = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null)
    const dispatch = useDispatch();
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    // Declaración de estado local

    const [userLocation, setUserLocation] = useState();

    useEffect(() => {
        if (!origin || !destination || !userLocation) return;

        // Calcula la región que abarca ambos puntos
        const minLat = Math.min(origin.lat, destination.lat, userLocation.latitude);
        const maxLat = Math.max(origin.lat, destination.lat, userLocation.latitude);
        const minLng = Math.min(origin.lng, destination.lng, userLocation.longitude);
        const maxLng = Math.max(origin.lng, destination.lng, userLocation.longitude);

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

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    console.log(data.rows[0].elements[0])

                });
        };


        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])


    //Obtener localizacion usuario
    useEffect(() => {
        // Obtiene la ubicación del usuario
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    // Suscríbete a las actualizaciones de ubicación
                    Location.watchPositionAsync(
                        {
                            accuracy: Location.Accuracy.High,
                            distanceInterval: 1,
                            timeInterval: 5000, // Actualiza cada 5 segundos (ajusta según tus necesidades)
                        },
                        (location) => {
                            const { latitude, longitude } = location.coords;
                            setUserLocation({ latitude, longitude });



                            // Imprime la ubicación del usuario en la consola
                            //console.log('Ubicación actualizada:', userLocation);
                        }
                    );
                } else {
                    console.warn('Permisos de ubicación denegados.');
                }
            } catch (error) {
                console.error('Error al obtener la ubicación del usuario:', error);
            }
        };

        getUserLocation();
    }, []);




    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="standard"
            initialRegion={{
                latitude: userLocation?.latitude || 4.60971, // Latitud predeterminada (ejemplo: Bogotá)
                longitude: userLocation?.longitude || -74.08175, // Longitud predeterminada
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    destination={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"

                />
            )}
            {origin?.lat && (
                <Marker
                    coordinate={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    title="Origin"
                    description={origin.name}
                    identifier="origin"
                />
            )}

            {destination?.lat && (
                <Marker
                    coordinate={{
                        latitude: destination.lat,
                        longitude: destination.lng,
                    }}
                    title="Destination"
                    description={destination.name}
                    identifier="destination"
                />
            )}

            {userLocation?.latitude && (

                <Marker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    }}
                    title="Mi ubicaciòn"
                    description="Aquì estoy"


                >
                    <Icon
                        name='motorcycle' // Cambia el ícono a uno relacionado con un repartidor
                        color='#00aced'
                        size={30} />
                </Marker>
            )}
        </MapView>
    );
};



export default MapDeliver

const style = StyleSheet.create({})