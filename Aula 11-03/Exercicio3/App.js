import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  function mostrarMensagem() {
    if (nome === '') {
      setMensagem('Digite seu nome');
    } else {
      setMensagem(`Olá ${nome}`);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Button title="Mostrar" onPress={mostrarMensagem} />

      <Text style={styles.texto}>
        {mensagem}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  texto: {
    marginTop: 15,
    fontSize: 18,
  },
});