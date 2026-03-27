import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {

const mensagens = [
    "Olá! Bem-vindo ao aplicativo!",
    "Botão pressionado com sucesso!",
    "Tenha um ótimo dia!",
    "React Native é incrível!",
    "Você clicou no botão!"
  ];

  const mostrarMensagem = () => {
    const numeroAleatorio = Math.floor(Math.random() * mensagens.length);
    Alert.alert(mensagens[numeroAleatorio]);
  };

    
  return (
    <View style={styles.container}>
      <Text>Meu Aplicativo</Text>
      <Text>Nome: Guilherme</Text>
      <Text>Idade: 25</Text>

      <Button
        title="Enviar"
        onPress={() => alert("Botão clicado")}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
