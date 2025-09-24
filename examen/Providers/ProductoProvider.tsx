import React, { useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios'
import { Producto } from '../Modelos/Producto'
import { ProductoContext, ProductoContextType } from '../Context/ProductoContext'

interface ProductoProviderProps {
    children: ReactNode;
}

const API_URL = 'http://192.168.79.168:5000';

export const ProductoProvider = ({ children }: ProductoProviderProps) => {
    const [productos, setProductos] = useState<Producto[]>([])

    const cargarProductos= async()=> {
        try{
            const response = await axios.get<Producto[]>(`${API_URL}/productos`);
            const productosConPrecioNumerico = response.data.map(p => ({
                ...p,
                precio:parseFloat(p.precio as any),
            }));
            setProductos(productosConPrecioNumerico)
        }catch(error){
            console.error('Error al obtener productos:', error)
        }
    }

    const agregarProducto = async(producto: Omit<Producto, 'id'>)=>{
        try{
            const response = await axios.post<Producto>(`${API_URL}/productos`, producto);
            setProductos(prev => [...prev, {
                ...response.data,
                precio:parseFloat(response.data.precio as any)
            }])
        }catch(error){
            console.error('Error al agregar producto:', error);
        }
    };

    const eliminarProducto = async (id:number) =>{
        try {
            await axios.delete(`${API_URL}/items/${id}`);
            setProductos(prev => prev.filter(p =>p.id!== id))
        } catch (error){
            console.error('Error al eliminar producto:',error)
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const value: ProductoContextType = {
        productos,
        cargarProductos,
        agregarProducto,
        eliminarProducto,
    };

    return (
        <ProductoContext.Provider value={value}>
            {children}
        </ProductoContext.Provider>
    );
};

export const useProductos=() =>{
    const context =useContext(ProductoContext)
    if(context ===undefined){
        throw new Error('useProductos debe ser utilizado dentro de un ProductoProvider');
    }
    return context
};