import { View, Text, StatusBar } from "react-native";
import React from "react";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import Cards from "./Cards";

enableScreens();
const SharedStack = createSharedElementStackNavigator();
export default function SldierCards() {
    return (
        <NativeBaseProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SharedStack.Navigator
                    screenOptions={{
                        headerMode: "none",
                    }}
                >
                    <SharedStack.Screen name="Cards" component={Cards} />
                </SharedStack.Navigator>
            </GestureHandlerRootView>
        </NativeBaseProvider>
    );
}
