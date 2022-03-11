import { Text, FlatList, Dimensions, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import {
    Box,
    Container,
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
import { createSharedElementStackNavigator, SharedElement } from "react-navigation-shared-element";
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
        bg: "#81c784",
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
        bg: "#ffa726",
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
            {Loading && (
                <SharedStack.Navigator
                    screenOptions={{
                        headerMode: "none",
                        cardStyle: [{ backgroundColor: "white" }, StyleSheet.absoluteFill],
                    }}
                >
                    <SharedStack.Screen name="MainScreen" component={MainScreen} />
                    <SharedStack.Screen
                        name="Detail"
                        component={Detail}
                        options={{
                            transitionSpec: {
                                open: {
                                    animation: "timing",
                                    config: { duration: 400 },
                                },
                                close: {
                                    animation: "timing",
                                    config: { duration: 400 },
                                },
                            },
                        }}
                    />
                </SharedStack.Navigator>
            )}
        </NativeBaseProvider>
    );
};

export default FoodCard;
function MainScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container flex={1} maxWidth={"full"} p={5}>
                <VStack space={"8"}>
                    <Header />
                    <Tabs />
                    <FlatList
                        data={data}
                        horizontal
                        snapToInterval={CARD_WIDTH + CARD_SPACE / 4}
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
            <Pressable
                onPress={() => navigation.navigate("Detail", item)}
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginRight: CARD_SPACE / 4,
                    elevation: 5,
                }}
            >
                <SharedElement id={`item.${item.id}.bg`} style={[StyleSheet.absoluteFill]}>
                    <View
                        style={[
                            {
                                borderRadius: 16,
                                overflow: "hidden",
                                width: CARD_WIDTH,
                                height: CARD_HEIGHT,
                                backgroundColor: item.bg,
                            },
                            StyleSheet.absoluteFill,
                        ]}
                    />
                </SharedElement>
                <SharedElement id={`item.${item.id}.title`}>
                    <RText style={{ fontSize: 20, position: "absolute", top: 20, left: 20 }}>
                        Salad Toppings
                    </RText>
                </SharedElement>
                <SharedElement id={`item.${item.id}.subtitle`}>
                    <RText light style={{ fontSize: 12, position: "absolute", top: 40, left: 20 }}>
                        Lorem ipsum dolor sit amet,
                    </RText>
                </SharedElement>
                <SharedElement id={`item.${item.id}.image`} style={StyleSheet.absoluteFill}>
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
                </SharedElement>
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
        <View flex={1} style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
            <SharedElement id={`item.${item.id}.bg`} style={StyleSheet.absoluteFill}>
                <View
                    style={[
                        {
                            borderRadius: 0,
                            backgroundColor: item.bg,
                        },
                        StyleSheet.absoluteFill,
                    ]}
                />
            </SharedElement>
            <VStack flex={1}>
                <SharedElement id={`item.${item.id}.title`}>
                    <RText
                        style={{
                            fontSize: 20,
                            position: "absolute",
                            top: 20,
                            left: 0,
                            fontSize: 28,
                        }}
                    >
                        Salad Toppings
                    </RText>
                </SharedElement>
                <SharedElement id={`item.${item.id}.subtitle`}>
                    <RText light style={{ fontSize: 12, position: "absolute", top: 50, left: 0 }}>
                        Lorem ipsum dolor sit amet,
                    </RText>
                </SharedElement>

                <SharedElement id={`item.${item.id}.image`}>
                    <Image
                        source={item.img}
                        style={{
                            resizeMode: "contain",
                            width: width - 20,
                            height: width - 20,
                            transform: [{ translateX: -40 }],
                            position: "absolute",
                            top: 100,
                            bottom: undefined,
                        }}
                        alt="Food"
                    />
                </SharedElement>
            </VStack>
            <VStack space={3}>
                <RText style={{ fontSize: 26 }}>${item.price}</RText>
                <RText light style={{ lineHeight: 14 * 1.537, fontSize: 14 }}>
                    {item.description}
                </RText>
                <HStack space={25}>
                    <Center size={50} bg="#FFA800" shadow={7} rounded="full">
                        {item.liked ? (
                            <AntDesign
                                name="heart"
                                size={24}
                                color="white"
                                style={{ elevation: 4 }}
                            />
                        ) : (
                            <AntDesign
                                name="hearto"
                                size={24}
                                color="white"
                                style={{ elevation: 4 }}
                            />
                        )}
                    </Center>
                    <Pressable
                        flex={1}
                        bg="#FFA800"
                        h={50}
                        rounded={"full"}
                        justifyContent="center"
                        alignItems={"center"}
                        shadow={7}
                    >
                        <RText white style={{ fontSize: 18 }}>
                            Add to Cart
                        </RText>
                    </Pressable>
                </HStack>
            </VStack>
        </View>
    );
}

Detail.sharedElements = ({ route }) => {
    const { id } = route.params;
    return [
        { id: `item.${id}.bg` },
        { id: `item.${id}.title` },
        { id: `item.${id}.subtitle` },
        { id: `item.${id}.image` },
    ];
};
