import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [texto, setTexto] = useState('');
  const [mostrar, setMostrar] = useState('');

  function exibirTexto() {
    setMostrar(texto);
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite algo"
        value={texto}
        onChangeText={setTexto}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Mostrar" onPress={exibirTexto} />

      <Text style={{ marginTop: 10 }}>
        {mostrar}
      </Text>
    </View>
  );
}