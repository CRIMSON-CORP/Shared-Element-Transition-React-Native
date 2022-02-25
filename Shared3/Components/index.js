import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Container } from "native-base";

const App = () => {
    return (
        <Container>
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true} />
                <Text>SliderCards</Text>
            </View>
        </Container>
    );
};

export default App;
