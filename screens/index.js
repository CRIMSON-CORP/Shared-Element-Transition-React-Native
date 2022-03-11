import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Easing } from "react-native-reanimated";
import Details from "./Details";
import List from "./List";
import { NativeBaseProvider } from "native-base";
const SharedStack = createSharedElementStackNavigator();
const SharedFirst = () => {
    return (
        <NativeBaseProvider>
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
                                        duration: 600,
                                        easing: Easing.inOut(Easing.quad),
                                    },
                                },
                                close: {
                                    animation: "timing",
                                    config: {
                                        duration: 600,
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
        </NativeBaseProvider>
    );
};

export default SharedFirst;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 0,
    },
});
