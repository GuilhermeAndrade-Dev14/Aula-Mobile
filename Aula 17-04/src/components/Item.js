import { View, Text, Button } from 'react-native'

import { StyleSheet } from "react-native"
export default function Item({ item, onToggle, onDelete }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, item.comprado === true && styles.comprado]}>
                {item.nome}
            </Text>

            <Button title="OK" onPress={() => onToggle(item.id)} />
            <Button title="DEL" onPress={() => onDelete(item.id)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    text: {
        fontSize: 18
    },
    comprado: {
        textDecorationLine: 'line-through',
        color: 'gray'
    }
})