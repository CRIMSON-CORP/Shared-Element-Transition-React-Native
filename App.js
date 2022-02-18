import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import List from "./screens/List";
import Details from "./screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import { Easing } from "react-native-reanimated";
enableScreens();

const SharedStack = createSharedElementStackNavigator();
export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <StatusBar />
                <View style={styles.container}>
                    <SharedStack.Navigator
                        initialRouteName="List"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <SharedStack.Screen name="List" component={List} />
                        <SharedStack.Screen
                            name="Details"
                            component={Details}
                            options={() => ({
                                gestureEnabled: false,
                                transitionSpec: {
                                    open: {
                                        animation: "timing",
                                        config: {
                                            duration: 1000,
                                            easing: Easing.inOut(Easing.quad),
                                        },
                                    },
                                    close: {
                                        animation: "timing",
                                        config: {
                                            duration: 1000,
                                            easing: Easing.inOut(Easing.quad),
                                        },
                                    },
                                },
                                cardStyleInterpolator: ({ current: { progress } }) => ({
                                    cardStyle: {
                                        opacity: progress,
                                    },
                                }),
                            })}
                        />
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
