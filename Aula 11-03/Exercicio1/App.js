import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Aplicativo</Text>

      <Text style={styles.nome}>Aluno: Luis Guilherme Marques Andrade</Text>

      <Text style={styles.frase}>
        "Aprender programação é construir o futuro!"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nome: {
    fontSize: 18,
    marginBottom: 10,
  },
  frase: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});