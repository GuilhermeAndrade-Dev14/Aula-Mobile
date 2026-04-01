import { View, Text, Button } from 'react-native'

export default function PerfilScreen({ navigation }) {
  return (
    <View>
      <Text>Perfil</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  )
}
