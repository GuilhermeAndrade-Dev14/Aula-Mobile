import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [comida, setComida] = useState ('')

  const [dadosSalvos, setDadosSalvos] = useState({})

  const salvarDados= async () => {
    try {
      const dados ={
        nome: nome,
        cidade: cidade,
        comida: comida
      }
    await AsyncStorage.setItem('dadosUsuario', JSON.stringify(dados))
    alert ('Dados salvos com sucesso!')
  } 
  catch (error){
    console.log(error)
  }
}

  const carregarDados = async () => {
    try {
      const valor = await AsyncStorage.getItem('dadosUsuario')
      if (valor !== null) {
        const dados = JSON.parse(valor)
        setDadosSalvos(dados)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removerDados = async () => {
    try {
      await AsyncStorage.removeItem('dadosUsuario')
      setNomeSalvo({})
      alert('Dados removido!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    carregarDados()
  }, {})

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro Simples</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        style={styles.input}
        placeholder="Comida favorita"
        value={comida}
        onChangeText={setComida}
      />

      <Button title="Salvar Dados " onPress={salvarDados} />
      <Button title="Carregar Dados" onPress={carregarDados} />
      <Button title="Remover Dados" onPress={removerDados} />

      <Text style={styles.resultado}>
        Nome: {dadosSalvos.nome}
      </Text>
      <Text style={styles.resultado}>
        Cidade: {dadosSalvos.cidade}
      </Text>
      <Text style={styles.resultado}>
        Comida favorita: {dadosSalvos.comida}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  resultado: {
    marginTop: 20,
    fontSize: 18
  }
})
