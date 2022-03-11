import React, { useContext, useState } from "react";
import {
    Box,
    Container,
    Heading,
    HStack,
    Image,
    Pressable,
    Text,
    useTheme,
    VStack,
    Center,
} from "native-base";
import { Dimensions, FlatList, StatusBar, StyleSheet } from "react-native";
import Header from "./MainSCreen/Header/index";
import Footer from "./MainSCreen/Footer/index";
import { createSharedElementStackNavigator, SharedElement } from "react-navigation-shared-element";
import { Assest } from "../assets";
import DetailsScreenExp from "./DetailsScreenExp";
import { MainContext } from "../contexts";
import Tabs from "./MainSCreen/Main/Tabs";
import Animated, {
    Easing,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { data } from "../data";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler } from "react-native-gesture-handler";
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
            <SharedStack.Screen
                name="DetailsScreen"
                component={DetailsScreenExp}
                options={{
                    cardStyle: {
                        backgroundColor: "yellow",
                    },
                    transitionSpec: {
                        open: {
                            animation: "timing",
                            config: { duration: 1000, easing: Easing.out(Easing.exp) },
                        },
                        close: {
                            animation: "timing",
                            config: { duration: 700, easing: Easing.out(Easing.exp) },
                        },
                    },
                }}
            />
        </SharedStack.Navigator>
    );
};

export default App;

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = height * 0.55;
const AnimatedBox = Animated.createAnimatedComponent(Box);
const DataLength = data[0].sites.length;
function MainScreen({ navigation }) {
    const [TabsMeasurments, setTabsMeasurments] = useState([]);
    const Scroll = useSharedValue(0);
    const Index = useSharedValue(0);
    const { colors } = useTheme();
    const SavedStartScroll = useSharedValue(0);
    const gesture = useAnimatedGestureHandler({
        onStart: () => {},
        onActive: (e) => {
            Scroll.value = -e.translationY / 30 + SavedStartScroll.value;
        },
        onFinish: (e) => {
            if (Scroll.value > 0) {
                Scroll.value = withTiming(0);
            } else if (Scroll.value < -(DataLength - 1) * 6) {
                Scroll.value = withTiming(-(DataLength - 1) * 6, {}, () => {
                    SavedStartScroll.value = Scroll.value;
                    Index.value = Math.abs(Scroll.value / 6);
                });
            } else {
                Scroll.value = withTiming(6 * Math.floor(Scroll.value / 6), {}, () => {
                    SavedStartScroll.value = Scroll.value;
                    Index.value = Math.abs(Scroll.value / 6);
                });
            }
        },
    });
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
                    <MainContext.Provider
                        value={{ TabsMeasurments, setTabsMeasurments, Scroll, Index, navigation }}
                    >
                        <VStack space={41}>
                            <Tabs />
                            <PanGestureHandler onGestureEvent={gesture}>
                                <AnimatedBox h={height * 0.6}>
                                    {data[0].sites.map((card, index) => (
                                        <Card
                                            card={card}
                                            Scroll={Scroll}
                                            Index={Index}
                                            cardIndex={index}
                                            key={card.id}
                                            navigation={navigation}
                                        />
                                    ))}
                                </AnimatedBox>
                            </PanGestureHandler>
                        </VStack>
                    </MainContext.Provider>
                    <Footer />
                </VStack>
            </Box>
        </Container>
    );
}

function Card({ card, Scroll, Index, cardIndex, navigation }) {
    const { colors } = useTheme();
    const dataLength = data[0].sites.length;
    let zIndex = dataLength - cardIndex;
    const AnimateBoxStyles = useAnimatedStyle(() => ({
        transform: [
            { translateY: interpolate(Scroll.value + cardIndex * 6, [0, 40], [0, -150]) },
            { scale: interpolate(Scroll.value + cardIndex * 6, [-5, 0, 40], [1.2, 1, 0.5]) },
        ],
        opacity: interpolate(Scroll.value + cardIndex * 6, [-5, 0, 40], [0, 1, 0]),
    }));
    return (
        <AnimatedBox
            w={CARD_WIDTH}
            h={CARD_HEIGHT}
            key={card.id}
            position="absolute"
            style={[{ zIndex, marginTop: 30 }, AnimateBoxStyles]}
        >
            <Pressable
                onPress={() =>
                    navigation.navigate("DetailsScreen", { card: data[0].sites[Index.value] })
                }
                style={[StyleSheet.absoluteFill]}
            >
                <AnimatedBox
                    w={CARD_WIDTH}
                    h={CARD_HEIGHT}
                    rounded={20}
                    mr={20 / 4}
                    overflow="hidden"
                >
                    <SharedElement id={`item.${card.id}.image`} style={[StyleSheet.absoluteFill]}>
                        <Image
                            source={card.img}
                            alt={card.location.city}
                            style={[
                                {
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                    resizeMode: "cover",
                                    borderRadius: 20,
                                },
                            ]}
                        />
                    </SharedElement>
                    <SharedElement id={`item.${card.id}.gradient`}>
                        <LinearGradient
                            colors={[
                                "rgba(0, 0, 0, 0)",
                                "rgba(0, 0, 0, 0.53)",
                                "rgba(0, 0, 0, 0.82)",
                            ]}
                            location={[0.0, 0.776, 0.1]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    zIndex: 4,
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                },
                            ]}
                        />
                    </SharedElement>
                    <VStack space={11} position="absolute" zIndex={5} bottom={5} p={5}>
                        <SharedElement id={`item.${card.id}.text`}>
                            <Heading textTransform={"uppercase"} fontSize={"xl"}>
                                {card.location.city}
                            </Heading>
                        </SharedElement>
                        <HStack space={11} alignItems="center">
                            <Center size={8.87} bg={colors.accent} rounded="full" />
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                {card.location.country}
                            </Text>
                        </HStack>
                    </VStack>
                </AnimatedBox>
            </Pressable>
        </AnimatedBox>
    );
}
