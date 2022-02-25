import React from "react";
import { NativeBaseProvider } from "native-base";
import { theme } from "./utils";
import App from "./Components";
import { useFont } from "@use-expo/font";
import { Assest } from "./assets";
const SliderCards = () => {
    const [Loading] = useFont(Assest.fonts.Roboto);
    return (
        <NativeBaseProvider theme={theme}>
            <App />
        </NativeBaseProvider>
    );
};

export default SliderCards;
