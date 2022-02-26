import React from "react";
import { NativeBaseProvider } from "native-base";
import { theme } from "./utils";
import App from "./Components";
import { useFonts } from "@use-expo/font";

import { Assest } from "./assets";
import Splash from "./Splash";
const SliderCards = () => {
    const [Loading] = useFonts(Assest.fonts.Roboto);
    return <NativeBaseProvider theme={theme}>{!Loading ? <Splash /> : <App />}</NativeBaseProvider>;
};

export default SliderCards;
