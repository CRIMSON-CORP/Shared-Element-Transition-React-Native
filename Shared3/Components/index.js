import React from "react";
import { Box, Container, Text, useTheme, VStack } from "native-base";
import { StatusBar } from "react-native";
import Header from "./Header";
import Main from "./Main";
const App = () => {
    const { colors } = useTheme();
    return (
        <Container
            bg={colors.background}
            flex={1}
            w={"full"}
            maxWidth={"full"}
            pt={StatusBar.currentHeight / 4}
        >
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            <Box p={5} flex={1} w="full">
                <VStack space={30}>
                    <Header />
                    <Main />
                </VStack>
            </Box>
        </Container>
    );
};

export default App;
