import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { API_URL, API_TOKEN } from '@env';
import tw from "twrnc";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/all-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_TOKEN}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error fetching orders");
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>Pedido ID: {item._id}</Text>
            <Text style={tw`text-gray-600`}>Cliente: {item.client}</Text>
            <Text style={tw`text-blue-500 font-semibold`}>Estado: {item.status}</Text>
            <Text style={tw`text-gray-600`}>Descripción: {item.description}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <Text style={tw`text-center text-lg text-gray-500`}>Cargando pedidos...</Text>;
    }

    if (orders.length === 0) {
        return <Text style={tw`text-center text-lg text-gray-500`}>No hay pedidos pendientes.</Text>;
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={renderOrderItem}
            contentContainerStyle={tw`p-4 bg-gray-100`}
        />
    );
};

export default PendingOrders;
