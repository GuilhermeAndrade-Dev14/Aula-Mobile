import React, { useEffect, useState } from 'react'
import { View, Button, FlatList, Text } from 'react-native'
import Item from '../components/Item'
import { carregarLista, salvarLista } from '../services/storage'

export default function HomeScreen({ navigation }) {
const [lista, setLista] = useState([])

useEffect(() => { carregar() }, [])

const carregar = async () => {
const dados = await carregarLista()
setLista(dados)
}

const toggleItem = (id) => {
const novaLista = lista.map(item =>
item.id === id ? { ...item, comprado: !item.comprado } : item
)
setLista(novaLista)
salvarLista(novaLista)
}

const deletarItem = (id) => {
const novaLista = lista.filter(item => item.id !== id)
setLista(novaLista)
salvarLista(novaLista)
}

const restantes = lista.filter(i => !i.comprado).length

return (
<View>
<Button title="Adicionar Item" onPress={() => navigation.navigate('Add')} />

<Text>Restantes: {restantes}</Text>

<FlatList
data={lista}
keyExtractor={(item) => item.id.toString()}
renderItem={({ item }) => (
<Item item={item} onToggle={toggleItem} onDelete={deletarItem} />
)}
/>

<Button title="Limpar Lista" onPress={() => {
setLista([])
salvarLista([])
}} />
</View>
)
}