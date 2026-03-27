import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Contato({ nome, telefone, idade, cidade }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{nome}</Text>
      <Text>Telefone: {telefone}</Text>
      <Text>Idade: {idade}</Text>
      <Text>cidade: {cidade}</Text>

      <Button title="Ver contato" onPress={() => alert(cidade)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1ae213',
    padding: 15,
    marginTop: 10,
    borderRadius: 8
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});