import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@listar_compras'

export const salvarLista = async (lista) => {
    try{
        await AsyncStorage.setItem(KEY, JSON.stringify(lista))
    }catch (e){
        console.log('Erro ao salvar', e)
    }
}

export const carregarLista = async () => {
    try{
        const dados = await AsyncStorage.getItem(KEY)
        return dados ? JSON.parse(dados) : [] 
    } catch (e){
        console.log ('Erro ao carregar', e)
        return []
    }
}