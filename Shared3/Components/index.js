import React from "react";
import { Box, Container, Text, useTheme, VStack } from "native-base";
import { StatusBar } from "react-native";
import Header from "./MainSCreen/Header/index";
import Main from "./MainSCreen/Main/index";
import Footer from "./MainSCreen/Footer/index";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const SharedStack = createSharedElementStackNavigator();
const App = () => {
    return (
        <SharedStack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                headerMode: "none",
            }}
        >
            <SharedStack.Screen name="MainScreen" component={MainScreen} />
        </SharedStack.Navigator>
    );
};

export default App;

function MainScreen() {
    const { colors } = useTheme();
    return (
        <Container
            bg={colors.background}
            flex={1}
            w={"full"}
            maxWidth={"full"}
            pt={StatusBar.currentHeight / 4}
        >
            <Box p={5} flex={1} w="full">
                <VStack space={30}>
                    <Header />
                    <Main />
                    <Footer />
                </VStack>
            </Box>
        </Container>
    );
}
