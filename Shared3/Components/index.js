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
import { Easing, useSharedValue } from "react-native-reanimated";
import { data } from "../data";
import { LinearGradient } from "expo-linear-gradient";
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
const CARD_HEIGHT = height * 0.6;
function MainScreen({ navigation }) {
    const [TabsMeasurments, setTabsMeasurments] = useState([]);
    const Scroll = useSharedValue(0);
    const Index = useSharedValue(0);
    const { colors } = useTheme();
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
                            <FlatList
                                data={data[0].sites}
                                keyExtractor={(d) => d.id}
                                showsHorizontalScrollIndicator={false}
                                bounces={false}
                                snapToInterval={CARD_WIDTH + 20}
                                contentContainerStyle={{
                                    overflow: "visible",
                                    position: "relative",
                                    height: height * 0.6,
                                    width: "100%",
                                }}
                                decelerationRate={100}
                                onScroll={(e) => {
                                    console.log(e.nativeEvent.contentOffset.x);
                                    Scroll.value = e.nativeEvent.contentOffset.x;
                                }}
                                onMomentumScrollEnd={(e) => {
                                    Index.value = Math.floor(
                                        e.nativeEvent.contentOffset.x / CARD_WIDTH
                                    );
                                }}
                                renderItem={({ item: card }) => (
                                    <Pressable
                                        onPress={() =>
                                            navigation.navigate("DetailsScreen", { card })
                                        }
                                        w={CARD_WIDTH}
                                        h={CARD_HEIGHT}
                                        key={card.id}
                                    >
                                        <Box style={[StyleSheet.absoluteFill]}>
                                            <Box
                                                w={CARD_WIDTH}
                                                h={CARD_HEIGHT}
                                                rounded={20}
                                                mr={20 / 4}
                                                overflow="hidden"
                                            >
                                                <SharedElement
                                                    id={`item.${card.id}.image`}
                                                    style={[StyleSheet.absoluteFill]}
                                                >
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
                                                <VStack
                                                    space={11}
                                                    position="absolute"
                                                    zIndex={5}
                                                    bottom={5}
                                                    p={5}
                                                >
                                                    <SharedElement id={`item.${card.id}.text`}>
                                                        <Heading
                                                            textTransform={"uppercase"}
                                                            fontSize={"xl"}
                                                        >
                                                            {card.location.city}
                                                        </Heading>
                                                    </SharedElement>
                                                    <HStack space={11} alignItems="center">
                                                        <Center
                                                            size={8.87}
                                                            bg={colors.accent}
                                                            rounded="full"
                                                        />
                                                        <Text
                                                            textTransform={"uppercase"}
                                                            fontSize={"md"}
                                                        >
                                                            {card.location.country}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </Pressable>
                                )}
                            />
                        </VStack>
                    </MainContext.Provider>
                    <Footer />
                </VStack>
            </Box>
        </Container>
    );
}

function CardsSlider({ cardData }) {
    const { navigation } = useContext(MainContext);
    const { colors } = useTheme();

    return (
        <FlatList
            data={cardData}
            keyExtracto={(item) => item.id}
            contentContainerStyle={{
                overflow: "visible",
                position: "relative",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
            }}
            CellRendererComponent={({ children, style, ...props }) => (
                <Box
                    style={[style, { position: "absolute", top: 0, left: 0 }]}
                    props={{ ...props }}
                    w={CARD_WIDTH}
                    h={CARD_HEIGHT}
                    flex={1}
                >
                    {children}
                </Box>
            )}
            renderItem={({ item: card }) => (
                <Pressable
                    onPress={() => navigation.navigate("DetailsScreen", { card })}
                    key={card.id}
                >
                    <Box w={CARD_WIDTH} h={CARD_HEIGHT} rounded={20} mr={20 / 4} overflow="hidden">
                        <SharedElement id={`item.${card.id}.image`}>
                            <Image
                                source={card.img}
                                alt={card.location.city}
                                style={[
                                    StyleSheet.absoluteFill,
                                    { width: CARD_WIDTH, height: CARD_HEIGHT, resizeMode: "cover" },
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
                                    { zIndex: 4, width: CARD_WIDTH, height: CARD_HEIGHT },
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
                    </Box>
                </Pressable>
            )}
        />
    );
}
