import React from 'react';
import { View, StyleSheet } from 'react-native';
import Contato from './Components/Contato';

export default function App() {
  return (
    <View style={styles.container}>
     <Contato nome="João" telefone="99999-1111" idade={25} cidade="São Paulo" />
      <Contato nome="Maria" telefone="99999-2222" idade={30} cidade="Rio de Janeiro" />
      <Contato nome="Pedro" telefone="99999-3333" idade={28} cidade="Curitiba" />
      <Contato nome="Guilherme" telefone="99999-4444" idade={22} cidade="Cianorte" />
      <Contato nome="Luis" telefone="99999-5555" idade={35} cidade="Belo Horizonte" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2'
  }
});