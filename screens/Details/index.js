import React, { useEffect, useRef } from "react";
import { Box, Center, HStack, Image, Pressable, Text, VStack } from "native-base";
import { Dimensions, TouchableOpacity, FlatList, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import shortid from "shortid";
import { SharedElement } from "react-navigation-shared-element";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
const WinWidth = Dimensions.get("window").width;
const CARD_WIDTH = 250;
const ICONS = [
    require("../../assets/coin_logos/bitcoin.png"),
    require("../../assets/coin_logos/bnbpng.png"),
    require("../../assets/coin_logos/dogepng.png"),
    require("../../assets/coin_logos/ethereumpng.png"),
    require("../../assets/coin_logos/litecoinpng.png"),
    require("../../assets/coin_logos/polygonpng.png"),
    require("../../assets/coin_logos/solanapng.png"),
    require("../../assets/coin_logos/tron.png"),
];

const CARDS = [
    {
        id: shortid.generate(),
        title: "Card One",
        color: "red.300",
    },
    {
        id: shortid.generate(),
        title: "Card Two",
        color: "green.300",
    },
    {
        id: shortid.generate(),
        title: "Card Three",
        color: "yellow.300",
    },
    {
        id: shortid.generate(),
        title: "Card Four",
        color: "orange.300",
    },
    {
        id: shortid.generate(),
        title: "Card Five",
        color: "violet.300",
    },
    {
        id: shortid.generate(),
        title: "Card Six",
        color: "amber.300",
    },
    {
        id: shortid.generate(),
        title: "Card Seven",
        color: "blue.300",
    },
    {
        id: shortid.generate(),
        title: "Card Eight",
        color: "emerald.300",
    },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedCenter = Animated.createAnimatedComponent(Center);
const Details = ({ navigation, route }) => {
    const FlatListAnimShared = useSharedValue(0);
    const Index = useSharedValue(route.params.index);
    const TranslateX = useSharedValue(-(Index.value * (CARD_WIDTH + 40)));
    const ActiveIcon = useSharedValue(route.params.index);
    const SliderRef = useRef();
    const FlatListAnimatedStyles = useAnimatedStyle(() => ({
        opacity: FlatListAnimShared.value,
        transform: [
            {
                translateY: interpolate(
                    FlatListAnimShared.value,
                    [0, 1],
                    [100, 0],
                    Extrapolate.CLAMP
                ),
            },
        ],
    }));
    useEffect(() => {
        FlatListAnimShared.value = withDelay(
            800,
            withTiming(1, { easing: Easing.out(Easing.exp), duration: 2000 })
        );
    }, []);

    const AnimatedHStackStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    TranslateX.value,
                    [0, -((CARD_WIDTH + 40) * CARDS.length)],
                    [0, -70 * ICONS.length]
                ),
            },
        ],
    }));

    return (
        <Box flex={1}>
            <Pressable
                px="5"
                pt="3"
                pb="0"
                onPress={() => {
                    FlatListAnimShared.value = withTiming(0, {}, () =>
                        runOnJS(navigation.goBack)()
                    );
                }}
            >
                <AntDesign name="left" size={24} />
            </Pressable>
            <VStack flex={1} justifyContent="space-around">
                <Box p="5" justifyContent={"center"}>
                    <AnimatedHStack
                        justifyContent="space-between"
                        style={[{ marginLeft: WinWidth / 2 - 50 }, AnimatedHStackStyles]}
                    >
                        {ICONS.map((img, index) => (
                            <CenteredIcon
                                img={img}
                                index={index}
                                key={index}
                                TranslateX={TranslateX}
                                selected={route.params.index}
                                FlatListRef={SliderRef}
                            />
                        ))}
                    </AnimatedHStack>
                </Box>
                <AnimatedFlatList
                    data={CARDS}
                    ref={SliderRef}
                    style={FlatListAnimatedStyles}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Box bg={item.color} p={"5"} w={CARD_WIDTH} flex={1} rounded="3xl" m={5}>
                            <Text>{item.title}</Text>
                        </Box>
                    )}
                    horizontal
                    snapToInterval={CARD_WIDTH + 40}
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={Index.value}
                    onScroll={(e) => {
                        TranslateX.value = -e.nativeEvent.contentOffset.x;

                        ActiveIcon.value = e.nativeEvent.contentOffset.x / WinWidth;
                    }}
                />
            </VStack>
        </Box>
    );
};

function CenteredIcon({ img, index, TranslateX, FlatListRef }) {
    const AnimatedCenterStyles = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    Math.abs(TranslateX.value / (CARD_WIDTH + 40)),
                    [index - 1, index, index + 1],
                    [1, 2, 1],
                    Extrapolate.CLAMP
                ),
            },
        ],
        opacity: interpolate(
            Math.abs(TranslateX.value / (CARD_WIDTH + 40)),
            [index - 1, index, index + 1],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        ),
    }));
    return (
        <SharedElement key={index} id={`item.${index}.icon`}>
            <Pressable
                key={index}
                onPress={function () {
                    FlatListRef.current.scrollToIndex({
                        animatd: true,
                        index,
                    });
                }}
            >
                <AnimatedCenter
                    size={30}
                    rounded={"full"}
                    m="5"
                    overflow={"hidden"}
                    bg={"white"}
                    shadow={3}
                    style={AnimatedCenterStyles}
                >
                    <Image
                        source={img}
                        alt={`${img}`}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />
                </AnimatedCenter>
            </Pressable>
        </SharedElement>
    );
}

Details.sharedElements = () => {
    return ICONS.map((_, index) => `item.${index}.icon`);
};

export default Details;
