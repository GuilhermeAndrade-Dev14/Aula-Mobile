import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [mensagem, setMensagem] = useState('');

  function mostrarMensagem() {
    if (nome === '' || idade === '') {
      setMensagem('Preencha todos os campos');
      return;
    }

    const idadeNumero = parseInt(idade);

    if (isNaN(idadeNumero)) {
      setMensagem('Digite uma idade válida');
      return;
    }

    setMensagem(`Olá ${nome}, você tem ${idadeNumero} anos!`);
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Digite sua idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Mostrar" onPress={mostrarMensagem} />

      <Text style={{ marginTop: 10 }}>
        {mensagem}
      </Text>
    </View>
  );
}