import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import List from "./screens/List";
import Details from "./screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
enableScreens();

const SharedStack = createSharedElementStackNavigator();
export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <StatusBar />
                <View style={styles.container}>
                    <SharedStack.Navigator initialRouteName="List">
                        <SharedStack.Screen name="List" component={List} />
                        <SharedStack.Screen name="Details" component={Details} />
                    </SharedStack.Navigator>
                </View>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 0,
    },
});
