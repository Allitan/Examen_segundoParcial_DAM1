import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProductos } from '../Providers/ProductoProvider'
import { Producto } from '../Modelos/Producto'

interface ProductoCardProps{
    producto: Producto
}
export default function ProductoCard({producto}:ProductoCardProps){
    const navigation = useNavigation()
    const { eliminarProducto } =useProductos()

    const handleEliminar =() =>{
        Alert.alert(
            'Confirmar Eliminacion',
            `Estas seguro de que quieres eliminar "${producto.nombre}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar', onPress: async () =>{
                        await eliminarProducto(producto.id)
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const handleVerDetalle = ()=>{
        navigation.navigate('DetalleProducto', { productoId: producto.id })
    }

    return(
        <View style={styles.card}>
            <View style={styles.imagenContainer}>
                {producto.url_fotografia && (
                    <Image source={{ uri: producto.url_fotografia }} style={styles.imagen}/>
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{producto.nombre}</Text>
                <Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>
            </View>
            <View style={styles.accionesContainer}>
                <TouchableOpacity onPress={handleVerDetalle} style={[styles.boton, styles.botonVer]}>
                    <Text style={styles.textoBoton}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEliminar} style={[styles.boton, styles.botonEliminar]}>
                    <Text style={styles.textoBoton}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    imagenContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagen: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    precio: {
        fontSize: 16,
        color: 'green',
        marginTop: 4,
    },
    accionesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginLeft: 10,
    },
    botonVer: {
        backgroundColor: '#007bff',
    },
    botonEliminar: {
        backgroundColor: '#dc3545',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
    },
});