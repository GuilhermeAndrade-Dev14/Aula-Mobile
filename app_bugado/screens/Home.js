import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { listarProdutos } from '../services/api';

export default function Home({ navigation }) {

  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');

  function carregar() {
    const dados = listarProdutos(); 
    setProdutos(dados);
  }

  function adicionar() {
    const novo = { nome: nome };
    setProdutos([...produtos, novo]); 
  }

  return (
    <View>
      <Text>Lista</Text>

      <Button title="Carregar" onPress={carregar} />

      {produtos.map((p, i) => (
        <Text 
          key={i} 
          onPress={() => navigation.navigate('DetalheProduto', { produto: p })}
        >
          {p.nome}
        </Text>
      ))}

      <TextInput 
        value={nome} 
        onChangeText={(text) => setNome(text)}
        placeholder="Nome do produto"
      />

      <Button title="Salvar" onPress={adicionar} />
    </View>
  );
}