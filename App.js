import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import SharedFirst from "./screens";
import Timer from "./TimerApp";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import SliderCards from "./Shared3";
import FoodCard from "./Shared4";
import SliderCards from "./SliderCards";
enableScreens();
export default function App() {
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SliderCards />
            </GestureHandlerRootView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 0,
    },
});
