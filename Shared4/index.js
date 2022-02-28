import { View, Text, FlatList, Dimensions, StatusBar, StyleSheet } from "react-native";
import React from "react";
import {
    Box,
    Container,
    Heading,
    HStack,
    NativeBaseProvider,
    VStack,
    Image,
    Center,
    Pressable,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Assest } from "../Shared3/assets";
import { useFonts } from "@use-expo/font";
import { AntDesign } from "@expo/vector-icons";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
const data = [
    {
        id: 0,
        title: "Salad Toppings",
        subTitle: "Lorem ipsum dolor sit amet,",
        img: require("./assets/images/food.png"),
        liked: true,
        price: 2.99,
        bg: "#90CAF9",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus phasellus in integer molestie. Vulputate enim, dignissim risus rhoncus eu. Eleifend in laoreet nisl aenean tristique ac. Adipiscing dapibus risus faucibus purus, diam eget felis gravida.",
    },
    {
        id: 1,
        title: "Salad Toppings",
        subTitle: "Lorem ipsum dolor sit amet,",
        img: require("./assets/images/food.png"),
        liked: false,
        price: 2.99,
        bg: "#FFA318",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus phasellus in integer molestie. Vulputate enim, dignissim risus rhoncus eu. Eleifend in laoreet nisl aenean tristique ac. Adipiscing dapibus risus faucibus purus, diam eget felis gravida.",
    },
    {
        id: 2,
        title: "Salad Toppings",
        subTitle: "Lorem ipsum dolor sit amet,",
        img: require("./assets/images/food.png"),
        liked: false,
        price: 2.99,
        bg: "#FFA318",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus phasellus in integer molestie. Vulputate enim, dignissim risus rhoncus eu. Eleifend in laoreet nisl aenean tristique ac. Adipiscing dapibus risus faucibus purus, diam eget felis gravida.",
    },
];

const CARD_WIDTH = 200;
const CARD_HEIGHT = 270;
const CARD_BORDER_RADIUS = 26;
const CARD_SPACE = 20;
const { width, height } = Dimensions.get("screen");
const SharedStack = createSharedElementStackNavigator();
const FoodCard = () => {
    const [Loading] = useFonts(Assest.fonts.Roboto);
    return (
        <NativeBaseProvider>
            <StatusBar backgroundColor={"white"} />
            {Loading && (
                <SharedStack.Navigator
                    screenOptions={{
                        headerMode: "none",
                        cardStyle: {
                            backgroundColor: "white",
                        },
                    }}
                >
                    <SharedStack.Screen name="MainScreen" component={MainScreen} />
                    <SharedStack.Screen name="Detail" component={Detail} />
                </SharedStack.Navigator>
            )}
        </NativeBaseProvider>
    );
};

export default FoodCard;
function MainScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container flex={1} maxWidth={"full"} p={5} pt={2}>
                <VStack space={"8"}>
                    <Header />
                    <Tabs />
                    <FlatList
                        data={data}
                        horizontal
                        snapToInterval={CARD_WIDTH + CARD_SPACE}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            overflow: "visible",
                        }}
                        renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                    />
                </VStack>
            </Container>
        </SafeAreaView>
    );

    function Header() {
        return (
            <HStack justifyContent={"space-between"} w="full">
                <VStack>
                    <RText style={{ fontSize: 28 }}>Good Morning</RText>
                    <RText light style={{ fontSize: 14 }}>
                        lorem ipsum dolor maic befor lama
                    </RText>
                </VStack>
                <Image
                    source={require("./assets/images/avatar.jpg")}
                    size={38}
                    alt="avatar"
                    rounded="full"
                />
            </HStack>
        );
    }

    function Tabs() {
        return (
            <HStack space="3" alignItems="center">
                <RText
                    style={{
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: "#FFA800",
                        fontSize: 16,
                    }}
                    white
                >
                    BreakFast
                </RText>
                <RText style={{ padding: 10, fontSize: 16, color: "#FFA800" }}>Dinner</RText>
                <RText style={{ padding: 10, fontSize: 16, color: "#FFA800" }}>Lunch</RText>
                <RText style={{ padding: 10, fontSize: 16, color: "#FFA800" }}>Supper</RText>
            </HStack>
        );
    }

    function Card({ item, navigation }) {
        return (
            <Pressable onPress={() => navigation.navigate("Detail", item)}>
                <Box
                    w={CARD_WIDTH}
                    h={CARD_HEIGHT}
                    rounded={CARD_BORDER_RADIUS * 1.1}
                    mr={CARD_SPACE / 4}
                    bg={item.bg}
                    p="4"
                    shadow={"5"}
                >
                    <VStack flex={1}>
                        <RText style={{ fontSize: 20 }}>Salad Toppings</RText>
                        <RText light style={{ fontSize: 12 }}>
                            Lorem ipsum dolor sit amet,
                        </RText>
                    </VStack>
                    <Image
                        source={item.img}
                        style={{
                            resizeMode: "contain",
                            width: 200,
                            height: 200,
                            alignSelf: "center",
                            transform: [{ translateX: -10 }],
                            position: "absolute",
                            bottom: 0,
                        }}
                        alt="Food"
                    />
                    {item.liked ? (
                        <AntDesign
                            name="heart"
                            size={24}
                            color="white"
                            style={{ alignSelf: "flex-end", elevation: 4 }}
                        />
                    ) : (
                        <AntDesign
                            name="hearto"
                            size={24}
                            color="white"
                            style={{ alignSelf: "flex-end", elevation: 4 }}
                        />
                    )}
                </Box>
            </Pressable>
        );
    }
}

function RText({ children, style, light, white, ...props }) {
    return (
        <Text
            style={[
                {
                    fontFamily: light ? "Roboto.300" : "Roboto.500",
                    color: white ? "white" : "black",
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}

function Detail({ navigation, route }) {
    const item = route.params;
    return (
        <Container flex={1} maxWidth={"full"} style={StyleSheet.absoluteFill}>
            <Box
                w={width}
                h={height}
                rounded={CARD_BORDER_RADIUS * 1.1}
                bg={item.bg}
                p="4"
                style={StyleSheet.absoluteFill}
            >
                <VStack flex={1}>
                    <RText style={{ fontSize: 20 }}>Salad Toppings</RText>
                    <RText light style={{ fontSize: 12 }}>
                        Lorem ipsum dolor sit amet,
                    </RText>
                </VStack>
                <Image
                    source={item.img}
                    style={{
                        resizeMode: "contain",
                        width: 200,
                        height: 200,
                        alignSelf: "center",
                        transform: [{ translateX: -10 }],
                        position: "absolute",
                        bottom: undefined,
                        top: 100,
                    }}
                    alt="Food"
                />
                {item.liked ? (
                    <AntDesign
                        name="heart"
                        size={24}
                        color="white"
                        style={{ alignSelf: "flex-end", elevation: 4 }}
                    />
                ) : (
                    <AntDesign
                        name="hearto"
                        size={24}
                        color="white"
                        style={{ alignSelf: "flex-end", elevation: 4 }}
                    />
                )}
            </Box>
        </Container>
    );
}
