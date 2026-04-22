import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { salvarLista, carregarLista } from '../services/storage'

export default function AddItemScreen({ navigation }) {
const [nome, setNome] = useState('')

const adicionar = async () => {
if (!nome) return

const listaAtual = await carregarLista()

const novoItem = {
id: Date.now(),
nome,
comprado: false
}

const novaLista = [...listaAtual, novoItem]

await salvarLista(novaLista)

navigation.goBack()
}

return (
<View>
<TextInput
placeholder="Digite o item"
value={nome}
onChangeText={setNome}
/>

<Button title="Salvar" onPress={adicionar} />
</View>
)
}