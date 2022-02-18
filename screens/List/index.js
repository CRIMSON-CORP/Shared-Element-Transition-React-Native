import React from "react";
import { Box, Center, FlatList, Pressable } from "native-base";
import shortid from "shortid";
const WinWidth = Dimensions.get("window");
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
];

const ICONS = [
    {
        img: require("../../assets/coin_logos/bitcoin.png"),
    },
    {
        img: require("../../assets/coin_logos/bnbpng.png"),
    },
    {
        img: require("../../assets/coin_logos/dogepng.png"),
    },
    {
        img: require("../../assets/coin_logos/ethereumpng.png"),
    },
    {
        img: require("../../assets/coin_logos/litecoinpng.png"),
    },
    {
        img: require("../../assets/coin_logos/polygonpng.png"),
    },
    {
        img: require("../../assets/coin_logos/solanapng.png"),
    },
    {
        img: require("../../assets/coin_logos/tron.png"),
    },
    {
        img: require("../../assets/coin_logos/xrppng.png"),
    },
];

const List = () => {
    return (
        <Box flex={1}>
            <VStack flex={1} justifyContent="space-between">
                <FlatList
                    data={CARDS}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Box bg={item.color} p={"5"} w={WinWidth * 0.7} h={200}>
                            <Text>{item.title}</Text>
                        </Box>
                    )}
                />
                <Box flexWrap={"wrap"}>
                    {ICONS.map(({ img }, index) => (
                        <Pressable key={index}>
                            <Center size={30}>
                                <Image source={img} />
                            </Center>
                        </Pressable>
                    ))}
                </Box>
            </VStack>
        </Box>
    );
};

export default List;
