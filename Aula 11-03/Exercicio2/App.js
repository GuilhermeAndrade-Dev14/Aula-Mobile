import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Image
        source={{ uri: 'https://ssl.gstatic.com/onebox/media/sports/logos/7spurne-xDt2p6C0imYYNA_64x64.png' }}
        style={styles.imagem}
      />

      <Text style={styles.nome}>Luis Guilherme Marques Andrade</Text>

      <Text style={styles.descricao}>
        Torcedor do Palmeiras.
      </Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Seguir</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  botao: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})