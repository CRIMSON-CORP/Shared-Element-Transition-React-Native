import { extendTheme } from "native-base";
export const theme = extendTheme({
    colors: {
        accent: "#E9DF00",
        background: "#171717",
        circleStroke: "#767676",
    },
    fonts: {
        heading: "Roboto",
        body: "Roboto",
    },
    fontSizes: {
        xl: 28,
        lg: 20,
        md: 16,
        sm: 10,
        "2xl": 48,
    },
    fontConfig: {
        Roboto: {
            100: {
                normal: "Roboto.100",
            },
            200: {
                normal: "Roboto.200",
            },
            300: {
                normal: "Roboto.300",
            },
            400: {
                normal: "Roboto.400",
            },
            500: {
                normal: "Roboto.500",
            },
        },
    },
    config: {
        initialColorMode: "light",
    },
    fontSizes: {
        sm: 10,
        md: 14,
        lg: 20,
        xl: 28,
    },
    components: {
        Heading: {
            baseStyle: {
                color: "white",
                fontWeight: "500",
            },
        },
        Text: {
            baseStyle: {
                color: "white",
                fontWeight: "300",
                sizes: {
                    md: {
                        fontSize: 16,
                    },
                },
            },
        },
    },
});
