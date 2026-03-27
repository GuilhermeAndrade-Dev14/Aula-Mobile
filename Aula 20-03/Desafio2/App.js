import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState('');

  function somar() {
    const soma = parseFloat(num1) + parseFloat(num2);

    if (isNaN(soma)) {
      setResultado('Digite números válidos');
    } else {
      setResultado(`Resultado: ${soma}`);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite o primeiro número"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Digite o segundo número"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Somar" onPress={somar} />

      <Text style={{ marginTop: 10 }}>
        {resultado}
      </Text>
    </View>
  );
}