import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProductos } from '../Providers/ProductoProvider'
import ProductoCard from '../Componentes/ProductoCard'
import { Producto } from '../Modelos/Producto';

export default function ListaProductosScreen(){
    const { productos, cargarProductos, eliminarProducto} =useProductos();
    const navigation= useNavigation()

    useEffect(()=>{
        const unsubscribe =navigation.addListener('focus',() =>{
            cargarProductos()
        })
        return unsubscribe
    },[navigation])

   const renderItem =({ item }: { item: Producto }) =>(
        <ProductoCard
            producto={item}/>
    );

    return (
        <View style={styles.container}>
            <Button
                title="Agregar Produto"
                onPress={() =>navigation.navigate('FormularioProducto')}
            />
            {productos.length === 0 ? (
                <Text style={styles.mensaje}>No hay productos para mostrar</Text>
            ) :(
                <FlatList
                    data={productos}
                    keyExtractor={item =>item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    mensaje: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
});