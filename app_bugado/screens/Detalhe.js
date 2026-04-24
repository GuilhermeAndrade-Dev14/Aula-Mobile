import React from 'react';
import { View, Text } from 'react-native';

export default function Detalhe({ route }) {

  const { produto } = route.params; 

  return (
    <View>
      <Text>{produto.nome}</Text>
    </View>
  );
}