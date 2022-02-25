import { extendTheme } from "native-base";
import { Assest } from "./assets";
export const theme = extendTheme({
    colors: {
        accent: "#E9DF00",
        background: "#171717",
        circleStroke: "#767676",
    },
    fonts: {
        heading: Assest.fonts.Roboto["Roboto.400"],
        body: Assest.fonts.Roboto["Roboto.200"],
    },
    fontSizes: {
        xl: 28,
        lg: 20,
        md: 14,
        sm: 10,
    },
});
