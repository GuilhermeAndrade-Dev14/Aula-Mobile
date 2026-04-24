import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Detalhe from './screens/Detalhe';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Lista de Produtos' }}
        />

        <Stack.Screen 
          name="Detalhe" 
          component={Detalhe} 
          options={{ title: 'Detalhe do Produto' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}