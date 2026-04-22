import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./screens/HomeScreen"
import AddItemScreen from "./screens/AddItemScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}