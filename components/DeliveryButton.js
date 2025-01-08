import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const DeliveryButton = ({ orderId, onStartDelivery }) => {
    const [deliveryStarted, setDeliveryStarted] = useState(false);

    const handleStartDelivery = () => {
        setDeliveryStarted(true);
        onStartDelivery(orderId);
    };

    return (
        <View>
            {deliveryStarted ? (
                <Text style={tw`text-green-500 text-center font-semibold`}>Entrega en curso</Text>
            ) : (
                <TouchableOpacity
                    style={tw`bg-blue-500 p-2 rounded-md mt-2`}
                    onPress={handleStartDelivery}
                >
                    <Text style={tw`text-white text-center font-semibold`}>Iniciar Entrega</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default DeliveryButton;