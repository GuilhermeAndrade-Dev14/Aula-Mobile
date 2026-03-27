import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [valor, setValor] = useState(0);

  function resetar() {
    setValor(0);
  }

  function alterarValor(numero) {
    setValor(valor + numero);
  }

  function calcularNovoValor(valorAtual, operacao) {
    if (operacao === 'dobrar') return valorAtual * 2;
    if (operacao === 'metade') return valorAtual / 2;
    if (operacao === 'triplicar') return valorAtual * 3;
    return valorAtual;
  }

  function executarOperacao(operacao) {
    const novoValor = calcularNovoValor(valor, operacao);
    setValor(novoValor);
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={{ uri: 'https://ssl.gstatic.com/onebox/media/sports/logos/7spurne-xDt2p6C0imYYNA_96x96.png' }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.titulo}>Funções no React Native</Text>
      <Text style={styles.subtitulo}>Valor atual:</Text>

      <Text style={styles.valor}>{valor}</Text>

      

      <View style={styles.linha}>

        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(+50)}>
          <Text style={styles.textoBotao}>+50</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(10)}>
          <Text style={styles.textoBotao}>+10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => alterarValor(-10)}>
          <Text style={styles.textoBotao}>-10</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('dobrar')}>
          <Text style={styles.textoBotao}>Dobrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('triplicar')}>
          <Text style={styles.textoBotao}>Triplicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => executarOperacao('metade')}>
          <Text style={styles.textoBotao}>Metade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoReset} onPress={resetar}>
          <Text style={styles.textoBotao}>Resetar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#036825',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: '#317257',
  },
  valor: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#9eebbc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  botaoReset: {
    backgroundColor: '#12e62e',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
  