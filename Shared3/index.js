import React from "react";
import { NativeBaseProvider } from "native-base";
import { theme } from "./utils";
import App from "./Components";
import { useFonts } from "@use-expo/font";

import { Assest } from "./assets";
import Splash from "./Splash";
import { StatusBar } from "react-native";
const SliderCards = () => {
    const [Loading] = useFonts(Assest.fonts.Roboto);
    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar backgroundColor={"transparent"} translucent={true} />
            {!Loading ? <Splash /> : <App />}
        </NativeBaseProvider>
    );
};

export default SliderCards;
