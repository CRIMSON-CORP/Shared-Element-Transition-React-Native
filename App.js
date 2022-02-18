import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import List from "./screens/List";

export default function App() {
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <List />
            </View>
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
