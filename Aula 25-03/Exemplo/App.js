import React from 'react';
import { View, StyleSheet } from 'react-native';
import Contato from './Components/Contato';

export default function App() {
  return (
    <View style={style.container}>
      <Contato nome="João" telefone="99999-1111" idade={25} />
      <Contato nome="Maria" telefone="99999-2222" idade={30} />
      <Contato nome="Pedro" telefone="99999-3333" idade={28} />
    </View>
  );
}



const style = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    borderRadius: 8
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
