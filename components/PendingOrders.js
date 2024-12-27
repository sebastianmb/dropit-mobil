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
     // Función para aceptar una orden
     const acceptOrder = async (orderId) => {
        try {
            const response = await fetch(`${API_URL}/accept-order/${orderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_TOKEN}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error accepting order");
            }

            // Actualizar la lista de órdenes tras aceptar
            Alert.alert("Orden aceptada", `La orden con ID ${orderId} ha sido aceptada.`);
            fetchOrders(); // Refresca la lista de pedidos
        } catch (error) {
            console.error("Error accepting order:", error);
            Alert.alert("Error", "No se pudo aceptar la orden. Intenta nuevamente.");
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    const renderOrderItem = ({ item }) => (
        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>Pedido ID: {item._id}</Text>
            <Text style={tw`text-gray-600`}>Cliente: {item.client}</Text>
            <Text style={tw`text-blue-500 font-semibold`}>Estado: {item.status}</Text>
            <Text style={tw`text-gray-600`}>Descripción: {item.description}</Text>
            <TouchableOpacity
                style={tw`bg-green-500 p-2 rounded-md mt-2`}
                onPress={() => acceptOrder(item._id)}
            >
                <Text style={tw`text-white text-center font-semibold`}>Aceptar orden</Text>
            </TouchableOpacity>
        </View>
        
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
