import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const PendingOrders = () => {
    // Datos simulados
    const mockOrders = [
        {
            id: '1',
            client: 'Juan Pérez',
            status: 'Pendiente',
            description: 'Entrega de documentos',
        },
        {
            id: '2',
            client: 'Ana Gómez',
            status: 'Pendiente',
            description: 'Paquete pequeño',
        },
        {
            id: '3',
            client: 'Carlos López',
            status: 'Pendiente',
            description: 'Caja mediana',
        },
    ];

    // Renderizar cada pedido
    const renderOrderItem = ({ item }) => (
        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>Pedido ID: {item.id}</Text>
            <Text style={tw`text-gray-600`}>Cliente: {item.client}</Text>
            <Text style={tw`text-blue-500 font-semibold`}>Estado: {item.status}</Text>
            <Text style={tw`text-gray-600`}>Descripción: {item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={mockOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={tw`p-4 bg-gray-100`}
        />
    );
};

export default PendingOrders;
