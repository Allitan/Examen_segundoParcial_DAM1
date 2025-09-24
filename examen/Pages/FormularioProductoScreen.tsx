import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useProductos } from '../Providers/ProductoProvider'
import * as ImagePicker from 'expo-image-picker'
import { Producto } from '../Modelos/Producto'

export default function FormularioProductoScreen(){
    const { agregarProducto } = useProductos()
    const navigation = useNavigation()

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [estado, setEstado] = useState('Disponible');
    const [categoria, setCategoria] = useState('');
    const [url_fotografia, setUrlFotografia] = useState<string | null>(null)

    const seleccionarImagen = async ()=>{
        let result =await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUrlFotografia(result.assets[0].uri);
        }
    };

    const handleGuardar = async ()=>{
        if (!nombre || !precio || !estado || !categoria){
            Alert.alert('Error', 'Por favor, completa todos los campos obligatorios')
            return;
        }

        const nuevoProducto: Omit<Producto, 'id'> ={
            nombre,
            descripcion,
            precio: parseFloat(precio),
            estado,
            categoria,
            url_fotografia,
        }

        await agregarProducto(nuevoProducto)
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre}/>

            <Text style={styles.label}>Descripción:</Text>
            <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} multiline/>

            <Text style={styles.label}>Precio:</Text>
            <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric"/>

            <Text style={styles.label}>Categoría:</Text>
            <TextInput style={styles.input} value={categoria} onChangeText={setCategoria}/>

            <Text style={styles.label}>Estado:</Text>
            <TextInput style={styles.input} value={estado} onChangeText={setEstado}/>

            <Button title="Seleccionar Foto" onPress={seleccionarImagen}/>
            {url_fotografia && <Image source={{ uri: url_fotografia }} style={styles.imagen}/>}

            <View style={styles.botonContainer}>
                <Button title="Guardar" onPress={handleGuardar}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    imagen: {
        width: 150,
        height: 150,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 15,
    },
    botonContainer: {
        marginTop: 20,
    },
});