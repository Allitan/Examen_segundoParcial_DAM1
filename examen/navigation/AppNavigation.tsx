import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListaProductosScreen from '../Pages/ListaProductosScreen'
import FormularioProductoScreen from '../Pages/FormularioProductoScreen'
import DetalleProductoScreen from '../Pages/DetalleProductoScreen'

const Stack = createStackNavigator();

export default function AppNavigator(){
    return (
        <Stack.Navigator initialRouteName="ListaProductos">
            <Stack.Screen
                name="ListaProductos"
                component={ListaProductosScreen}
                options={{ title: 'Productos' }}/>
            <Stack.Screen
                name="FormularioProducto"
                component={FormularioProductoScreen}
                options={{ title: 'Crear Producto' }}/>
            <Stack.Screen
                name="DetalleProducto"
                component={DetalleProductoScreen}
                options={{ title: 'Detalle del Producto' }}/>
        </Stack.Navigator>
    );
}