import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ProductoProvider } from './Providers/ProductoProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigation';

export default function App() {
  return (
    <ProductoProvider>
      <NavigationContainer>
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </ProductoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
