import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProductos } from '../Providers/ProductoProvider'
import { Producto } from '../Modelos/Producto';

export default function DetalleProductoScreen(){
    const { productos, eliminarProducto }=useProductos()
    const navigation = useNavigation()
    const route = useRoute()

    //@ts-ignore
    const { productoId }=route.params

    const producto = productos.find(p => p.id ===productoId);

    const handleEliminar =() =>{
        if (producto) {
            Alert.alert(
                'Confirmar Eliminacion',
                `Estas seguro de que quieres eliminar "${producto.nombre}"?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', onPress: async () => {
                        await eliminarProducto(producto.id)
                        navigation.goBack()
                    }},
                ],
                { cancelable:false }
            );
        }
    };

    if (!producto) {
        return <Text style={styles.mensaje}>Producto no encontrado</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{producto.nombre}</Text>
            {producto.url_fotografia && <Image source={{ uri: producto.url_fotografia }} style={styles.imagen}/>}
            <Text style={styles.label}>Descripcion:</Text>
            <Text style={styles.texto}>{producto.descripcion}</Text>
            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.texto}>${producto.precio.toFixed(2)}</Text>
            <Text style={styles.label}>Categoria:</Text>
            <Text style={styles.texto}>{producto.categoria}</Text>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.texto}>{producto.estado}</Text>
            
            <View style={styles.botonContainer}>
                <Button title="Eliminar" onPress={handleEliminar} color="red"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
    },
    imagen: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    mensaje: {
        textAlign: 'center',
        marginTop: 50,
    },
    botonContainer: {
        marginTop: 30,
    },
});